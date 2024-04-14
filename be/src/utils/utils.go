package utils

import (
	"encoding/json"
	"os"
	"time"

	"github.com/go-playground/validator"
	pasetoware "github.com/gofiber/contrib/paseto"
	"github.com/gofiber/fiber/v2"
	"github.com/segmentio/ksuid"
)

func GetKSUID() string {
	id := ksuid.New()
	return id.String()
}

func ValidateStruct(s interface{}) error {

	validate := validator.New()

	err := validate.Struct(s)

	if err != nil {

		return err

	}

	return nil

}

type JWTPayloadStruct struct {
	ID        string    `json:"id"`
	ExpiresAt time.Time `json:"expiresAt"`
}

func GetPasetoConfig() func(*fiber.Ctx) error {

	return pasetoware.New(pasetoware.Config{
		SymmetricKey: []byte(os.Getenv("jwt_secret")),
		TokenLookup:  [2]string{"cookie", "token"},
		Validate: func(decrypted []byte) (any, error) {
			var payload JWTPayloadStruct
			err := json.Unmarshal(decrypted, &payload)
			return payload, err
		},
	})

}

func GetUserIDFromToken(c *fiber.Ctx) string {

	payload := c.Locals(pasetoware.DefaultContextKey).(JWTPayloadStruct)

	return payload.ID

}
