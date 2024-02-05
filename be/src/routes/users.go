package routes

import (
	"github.com/alok-pandit/daily-bread/src/handlers"
	"github.com/alok-pandit/daily-bread/src/utils"
	"github.com/gofiber/fiber/v2"
)

func UserRouter(router fiber.Router) {

	router.Post("/", handlers.CreateUser)
	router.Post("/login", handlers.Login)
	router.Get("/refresh", handlers.RefreshToken)
	secure := router.Group("/secure", utils.GetPasetoConfig())
	secure.Get("/", handlers.GetAllUsers)
	secure.Get("/:id", handlers.GetUserByID)

}
