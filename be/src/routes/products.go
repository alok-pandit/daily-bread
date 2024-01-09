package routes

import (
	"github.com/alok-pandit/daily-bread/src/handlers"
	"github.com/gofiber/fiber/v2"
)

func ProductRouter(router fiber.Router) {

	router.Get("/", handlers.ListAllProducts)
	router.Get("/:id", handlers.GetProductByID)

}
