package initiator

import (
	"context"
	"log"
	"os"

	"github.com/alok-pandit/daily-bread/src/db"
	"github.com/alok-pandit/daily-bread/src/db/gen"
	"github.com/alok-pandit/daily-bread/src/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/encryptcookie"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/idempotency"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/segmentio/encoding/json"
)

func Initialize() {

	app := fiber.New(fiber.Config{
		// Prefork:      true,
		ServerHeader: "Fiber",
		AppName:      "daily-bread",
		JSONEncoder:  json.Marshal,
		JSONDecoder:  json.Unmarshal,
	})

	if os.Getenv("ENV") != "prod" {

		app.Use(requestid.New())

		app.Use(logger.New(logger.Config{
			Format: "[${ip}]:${port} ${locals:requestid} ${status} - ${method} ${path}\n",
		}))

	}

	app.Use(recover.New())

	app.Use(idempotency.New())

	app.Use(cors.New())

	app.Use(helmet.New())

	app.Use(encryptcookie.New(encryptcookie.Config{
		Key: os.Getenv("COOKIE_ENC_KEY"),
	}))

	conn := db.Connect()

	defer conn.Close(context.Background())

	db.Sqlc = gen.New(conn)

	api := app.Group("/api")

	api.Group("/user").Route("/", routes.UserRouter)

	api.Group("/products").Route("/", routes.ProductRouter)

	log.Fatal(app.Listen(":" + os.Getenv("PORT")))

}
