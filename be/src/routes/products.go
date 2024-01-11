package routes

import (
	"github.com/alok-pandit/daily-bread/src/handlers"
	"github.com/gofiber/fiber/v2"
)

func ProductRouter(router fiber.Router) {

	// router.Get("/list/:id-:limit<min(1);max(100)>", handlers.ListAllProducts)
	router.Post("/list", handlers.ListAllProducts)
	router.Get("/:id", handlers.GetProductByID)

}
