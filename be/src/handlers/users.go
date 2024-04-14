package handlers

import (
	"os"
	"time"

	"github.com/alok-pandit/daily-bread/src/db"
	"github.com/alok-pandit/daily-bread/src/db/gen"
	"github.com/alok-pandit/daily-bread/src/models"
	"github.com/alok-pandit/daily-bread/src/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/o1egl/paseto"
)

// CreateUser godoc
//
//	@Summary		Create new user
//	@Description	Create new user
//	@Tags			users
//	@Accept			json
//	@Produce		json
//	@Success		201		{string}  string  "OK"
//	@Failure		400		{string}  error  "Bad Request"
//	@Router			/api/user/CreateUser [post]
func CreateUser(c *fiber.Ctx) error {

	var newUser models.CreateUserInput

	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if err := utils.ValidateStruct(newUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	hashedPassword, err := utils.ArgonHash(newUser.Password)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if err := db.Sqlc.CreateUser(c.Context(), gen.CreateUserParams{
		ID:       utils.GetKSUID(),
		Fullname: newUser.Fullname,
		Username: newUser.Username,
		Password: hashedPassword,
	}); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	newUser.Password = ""

	return c.Status(fiber.StatusCreated).JSON(newUser)

}

func RefreshToken(c *fiber.Ctx) error {

	token := c.Cookies("refresh_token")

	if len(token) == 0 {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Refresh token not found",
		})
	}

	var payload utils.JWTPayloadStruct

	err := paseto.NewV2().Decrypt(token, []byte(os.Getenv("jwt_secret")), &payload, nil)

	if time.Now().Compare(payload.ExpiresAt) > 0 {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Refresh token expired",
		})
	}

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid refresh token",
		})
	}

	t, err := db.Sqlc.GetRefreshToken(c.Context(), payload.ID)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid refresh token",
		})
	}

	if t.String != token {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid refresh token",
		})
	}

	encryptedToken, err := paseto.NewV2().Encrypt([]byte(os.Getenv("jwt_secret")), utils.JWTPayloadStruct{
		ID:        payload.ID,
		ExpiresAt: time.Now().Add(time.Minute * 15),
	}, nil)

	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    encryptedToken,
		HTTPOnly: true,
		Secure:   true,
		Expires:  time.Now().Add(time.Minute * 15),
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"Success": payload})

}

func Login(c *fiber.Ctx) error {

	var user models.CreateUserInput

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.LoginAPIResponse{
			Success: false,
			Message: "Invalid request body: " + err.Error(),
		})
	}

	if err := utils.ValidateStruct(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.LoginAPIResponse{
			Success: false,
			Message: "Error validating input struct: " + err.Error(),
		})
	}

	row, err := db.Sqlc.GetUser(c.Context(), user.Username)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.LoginAPIResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	ok, err := utils.ArgonMatch(user.Password, row.Password)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.LoginAPIResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(models.LoginAPIResponse{
			Success: false,
			Message: "Invalid credentials",
		})
	}

	encryptedToken, err := paseto.NewV2().Encrypt([]byte(os.Getenv("jwt_secret")), utils.JWTPayloadStruct{
		ID:        row.ID,
		ExpiresAt: time.Now().Add(time.Minute * 15),
	}, nil)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.LoginAPIResponse{
			Success: false,
			Message: "Error in token creation: " + err.Error(),
		})
	}

	refreshToken, err := paseto.NewV2().Encrypt([]byte(os.Getenv("jwt_secret")), utils.JWTPayloadStruct{
		ID:        row.ID,
		ExpiresAt: time.Now().Add(time.Minute * 60 * 24 * 365),
	}, nil)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.LoginAPIResponse{
			Success: false,
			Message: "Error in token creation: " + err.Error(),
		})
	}

	if err := db.Sqlc.SaveRefreshToken(c.Context(), gen.SaveRefreshTokenParams{
		ID:           row.ID,
		RefreshToken: pgtype.Text{String: refreshToken, Valid: true},
	}); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.LoginAPIResponse{
			Success: false,
			Message: "Error in refresh token creation: " + err.Error(),
		})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    encryptedToken,
		HTTPOnly: true,
		Secure:   true,
		Expires:  time.Now().Add(time.Minute * 15),
	})

	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken,
		HTTPOnly: true,
		Secure:   true,
		Expires:  time.Now().Add(time.Minute * 60 * 24 * 365),
	})

	return c.Status(fiber.StatusOK).JSON(models.LoginAPIResponse{
		Success: true,
		Message: "",
	})

}

func GetAllUsers(c *fiber.Ctx) error {
	users, err := db.Sqlc.ListUsers(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(users)
}

func GetUserByID(c *fiber.Ctx) error {

	id := c.Params("id")

	user, err := db.Sqlc.GetUserByID(c.Context(), id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(user)

}
