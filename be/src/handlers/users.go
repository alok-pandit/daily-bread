package handlers

import (
	"fmt"
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
// @Summary Create a new user
// @Description Create a new user
// @Tags users
// @Accept json
// @Produce json
// @Param body body models.CreateUserInput true "User object"
// @Success 201 {object} models.CreateUserInput
// @Failure 400 {object} map[string]interface{}
// @Failure 500 {object} map[string]interface{}
// @Router /api/user [post]
func CreateUser(c *fiber.Ctx) error {

	// Declare a new user object
	var newUser models.CreateUserInput

	// Parse the request body into the user object
	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	// Validate the user object
	if err := utils.ValidateStruct(newUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	// Hash the user's password
	hashedPassword, err := utils.ArgonHash(newUser.Password)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	// Create the user in the database
	if err := db.Sqlc.CreateUser(c.Context(), gen.CreateUserParams{
		ID:       utils.GetKSUID(),
		Fullname: newUser.Fullname,
		Username: newUser.Username,
		Password: hashedPassword,
	}); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	// Clear the user's password from the response
	newUser.Password = ""

	res := models.CreateUserResponse{
		Success: true,
		Message: "User created successfully",
	}

	// Return the created user
	return c.Status(fiber.StatusCreated).JSON(res)

}

// RefreshToken godoc
//
//	@Summary		Refresh user's token
//	@Description	Refresh user's token
//	@Tags			users
//	@Accept			json
//	@Produce		json
//	@Success		200		{string}  string  "OK"
//	@Failure		400		{string}  error  "Bad Request"
//	@Router			/api/user/RefreshToken [post]
func RefreshToken(c *fiber.Ctx) error {

	// Get the refresh token from the cookie
	token := c.Cookies("refresh_token")

	// If the refresh token is not found, return an unauthorized error
	if len(token) == 0 {
		return c.Status(fiber.StatusUnauthorized).JSON(models.ErrorResponse{
			Success: false,
			Message: "Refresh token not found",
		})
	}

	// Decrypt the refresh token using the secret key
	var payload utils.JWTPayloadStruct
	err := paseto.NewV2().Decrypt(token, []byte(os.Getenv("jwt_secret")), &payload, nil)

	// If the token has expired, return a bad request error
	if time.Now().Compare(payload.ExpiresAt) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Success: false,
			Message: "Refresh token expired",
		})
	}

	// If there is an error decrypting the token, return a bad request error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	// Get the user's refresh token from the database
	t, err := db.Sqlc.GetRefreshToken(c.Context(), payload.ID)

	// If there is an error getting the user's refresh token, return a bad request error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	// If the token in the database does not match the token in the request, return a bad request error
	if t.String != token {
		return c.Status(fiber.StatusBadRequest).JSON(models.ErrorResponse{
			Success: false,
			Message: "Invalid Refresh Token",
		})
	}

	// Encrypt a new token using the secret key and the user's ID
	encryptedToken, err := paseto.NewV2().Encrypt([]byte(os.Getenv("jwt_secret")), utils.JWTPayloadStruct{
		ID:        payload.ID,
		ExpiresAt: time.Now().Add(time.Minute * 15),
	}, nil)

	// If there is an error encrypting the token, return an internal server error
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	// Set the new token as a cookie in the response
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Path:     "/",
		Value:    encryptedToken,
		HTTPOnly: true,
		Expires:  time.Now().Add(time.Minute * 15),
	})

	// Return a success message
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"Success": payload})

}

// Login godoc
// @Summary		Login user
// @Description	Login user
// @Tags			users
// @Accept			json
// @Produce		json
// @Param		body	body	models.CreateUserInput true "User object"
// @Success		200		{string}  string  "OK"
// @Failure		400		{string}  error  "Bad Request"
// @Router			/api/user/Login [post]
func Login(c *fiber.Ctx) error {

	// Validate the request body
	var user models.LoginAPIInput
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body: " + err.Error(),
		})
	}

	// Validate the user object
	if err := utils.ValidateStruct(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Get the user from the database
	row, err := db.Sqlc.GetUser(c.Context(), user.Username)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Check if the user exists
	ok, err := utils.ArgonMatch(user.Password, row.Password)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Encrypt a new token using the secret key and the user's ID
	encryptedToken, err := paseto.NewV2().Encrypt([]byte(os.Getenv("jwt_secret")), utils.JWTPayloadStruct{
		ID:        row.ID,
		ExpiresAt: time.Now().Add(time.Minute * 15),
	}, nil)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error in token creation: " + err.Error(),
		})
	}

	// Encrypt a new refresh token using the secret key and the user's ID
	refreshToken, err := paseto.NewV2().Encrypt([]byte(os.Getenv("jwt_secret")), utils.JWTPayloadStruct{
		ID:        row.ID,
		ExpiresAt: time.Now().Add(time.Minute * 60 * 24 * 365),
	}, nil)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error in token creation: " + err.Error(),
		})
	}

	// Save the refresh token in the database
	if err := db.Sqlc.SaveRefreshToken(c.Context(), gen.SaveRefreshTokenParams{
		ID:           row.ID,
		RefreshToken: pgtype.Text{String: refreshToken, Valid: true},
	}); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Error in refresh token creation: " + err.Error(),
		})
	}

	// Set the new refresh token as a cookie in the response
	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Path:     "/",
		Value:    refreshToken,
		HTTPOnly: true,
		Expires:  time.Now().Add(time.Minute * 60 * 24 * 365),
	})

	// Set the new token as a cookie in the response
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Path:     "/",
		Value:    encryptedToken,
		HTTPOnly: true,
		Expires:  time.Now().Add(time.Hour * 12),
	})

	resp := models.LoginAPIResponse{
		Success: true,
		Message: row.ID,
	}
	// Return a success message
	return c.Status(fiber.StatusOK).JSON(resp)

}

// GetAllUsers godoc
// @Summary Get all users
// @Description Get all users from the database
// @Tags users
// @Accept json
// @Produce json
// @Success 200 {array} models.User "A list of all users"
// @Failure 400 {object} map[string]interface{} "Bad request"
// @Failure 500 {object} map[string]interface{} "Internal server error"
// @Router /api/user [get]
func GetAllUsers(c *fiber.Ctx) error {
	users, err := db.Sqlc.ListUsers(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(users)
}

// GetUserByID godoc
// @Summary Get user by ID
// @Description Get user by ID from the database
// @Tags users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Success 200 {object} models.UserPublicDetails "User details"
// @Failure 400 {object} map[string]interface{} "Bad request"
// @Failure 500 {object} map[string]interface{} "Internal server error"
// @Router /api/user/{id} [get]
func GetUserByID(c *fiber.Ctx) error {

	id := c.Params("id")

	fmt.Println("ID: ", id)

	user, err := db.Sqlc.GetUserByID(c.Context(), id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(models.ErrorResponse{
			Success: false,
			Message: err.Error(),
		})
	}

	response := models.GetUserByIDResponse{
		Success: true,
		UserDetails: models.UserPublicDetails{
			Fullname: user.Fullname,
			Username: user.Username,
		},
	}

	return c.Status(fiber.StatusOK).JSON(response)

}

func Logout(c *fiber.Ctx) error {

	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Path:     "/",
		Value:    "",
		HTTPOnly: true,
		Expires:  time.Now().Add(-time.Hour * 12),
	})

	c.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Path:     "/",
		Value:    "",
		HTTPOnly: true,
		Expires:  time.Now().Add(-time.Hour * 12),
	})

	return c.Status(fiber.StatusOK).JSON(models.CreateUserResponse{
		Success: true,
		Message: "Logged out successfully",
	})

}
