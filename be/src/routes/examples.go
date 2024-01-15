package routes

import (
	"github.com/alok-pandit/daily-bread/src/handlers"
	"github.com/gofiber/fiber/v2"
)

func ExamplesRouter(router fiber.Router) {
	router.Get("/", handlers.GetCounter)
	router.Patch("/", handlers.IncrementCounter)
	router.Post("/", handlers.IncrementCounterWithMutex)
}
