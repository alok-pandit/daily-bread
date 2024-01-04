package initiator

import "github.com/gofiber/fiber/v2"

func Initialize() {

	app := fiber.New(fiber.Config{
		Prefork:      true,
		ServerHeader: "Fiber",
		AppName:      "daily-bread",
	})

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON("Hello, World!")
	})

	app.Listen(":3000")

}
