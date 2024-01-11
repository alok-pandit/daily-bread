package handlers

import (
	"github.com/alok-pandit/daily-bread/src/db"
	"github.com/alok-pandit/daily-bread/src/db/gen"
	"github.com/alok-pandit/daily-bread/src/models"
	"github.com/alok-pandit/daily-bread/src/utils"
	"github.com/gofiber/fiber/v2"
)

func ListAllProducts(c *fiber.Ctx) error {

	var productsInput models.GetProductsInput

	if err := c.BodyParser(&productsInput); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if err := utils.ValidateStruct(productsInput); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if productsInput.First < 1 {
		productsInput.First = 10
	}

	if len(productsInput.After) < 1 && len(productsInput.Before) < 1 {

		if productsInput.Last > 0 {

			products, err := db.Sqlc.GetLastNProducts(c.Context(), productsInput.Last)

			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}

			return c.Status(fiber.StatusOK).JSON(products)

		}

		products, err := db.Sqlc.GetFirstNProducts(c.Context(), productsInput.First)

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(products)

	}

	if len(productsInput.After) > 0 {

		products, err := db.Sqlc.ListNProductsAfter(c.Context(), gen.ListNProductsAfterParams{
			Limit: int32(productsInput.First),
			ID:    productsInput.After,
		})

		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(products)

	}

	products, err := db.Sqlc.ListNProductsBefore(c.Context(), gen.ListNProductsBeforeParams{
		Limit: int32(productsInput.First),
		ID:    productsInput.Before,
	})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(products)

}

func GetProductByID(c *fiber.Ctx) error {

	id := c.Params("id")

	product, err := db.Sqlc.GetProductByID(c.Context(), id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(product)

}
