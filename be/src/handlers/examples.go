package handlers

import (
	"github.com/alok-pandit/daily-bread/src/db"
	"github.com/gofiber/fiber/v2"
)

func GetCounter(c *fiber.Ctx) error {

	counter, err := db.Sqlc.GetCounter(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(counter)

}

func IncrementCounterWithMutex(c *fiber.Ctx) error {

	if err := db.Sqlc.IncrementCounterForUpdate(c.Context()); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.SendStatus(fiber.StatusOK)

}

func IncrementCounter(c *fiber.Ctx) error {

	if err := db.Sqlc.IncrementCounter(c.Context()); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.SendStatus(fiber.StatusOK)

}
