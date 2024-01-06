package initiator

import (
	"context"
	"log"
	"os"

	"github.com/alok-pandit/daily-bread/src/db"
	"github.com/alok-pandit/daily-bread/src/db/gen"
	"github.com/alok-pandit/daily-bread/src/routes"
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/encryptcookie"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/idempotency"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func Initialize() {

	app := fiber.New(fiber.Config{
		Prefork:      true,
		ServerHeader: "Fiber",
		AppName:      "daily-bread",
		JSONEncoder:  json.Marshal,
		JSONDecoder:  json.Unmarshal,
	})

	app.Use(recover.New())

	app.Use(idempotency.New())

	app.Use(cors.New())

	app.Use(helmet.New())

	app.Use(encryptcookie.New(encryptcookie.Config{
		Key: os.Getenv("JWT_SECRET"),
	}))

	conn := db.Connect()

	defer conn.Close(context.Background())

	db.Sqlc = gen.New(conn)

	api := app.Group("/api")

	api.Group("/user").Route("/", routes.UserRouter)

	log.Fatal(app.Listen(":" + os.Getenv("PORT")))

}
