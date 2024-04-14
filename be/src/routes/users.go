package routes

import (
	"github.com/alok-pandit/daily-bread/src/handlers"
	"github.com/alok-pandit/daily-bread/src/utils"
	"github.com/gofiber/fiber/v2"
)

// UserRouter configures the router with all the routes related to user operations.
// It sets up both public and secure routes for handling user-related requests.
func UserRouter(router fiber.Router) {
	// POST / creates a new user.
	router.Post("/", handlers.CreateUser)

	// POST /login authenticates a user and returns a token.
	router.Post("/login", handlers.Login)

	// GET /refresh refreshes the authentication token.
	router.Get("/refresh", handlers.RefreshToken)

	// Group /secure routes under a middleware that checks for a valid PASETO token.
	secure := router.Group("/secure", utils.GetPasetoConfig())

	// GET /secure/ lists all users. Requires a valid PASETO token.
	secure.Get("/", handlers.GetAllUsers)

	// GET /secure/:id retrieves a specific user by ID. Requires a valid PASETO token.
	secure.Get("/:id", handlers.GetUserByID)
}
