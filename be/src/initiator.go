package initiator

import (
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
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/storage/sqlite3"
	"github.com/segmentio/encoding/json"
)

func Initialize() {

	app := fiber.New(fiber.Config{
		Prefork:      true,
		ServerHeader: "Fiber",
		AppName:      "daily-bread",
		JSONEncoder:  json.Marshal,
		JSONDecoder:  json.Unmarshal,
	})

	storage := sqlite3.New() // From github.com/gofiber/storage/sqlite3
	app.Use(limiter.New(limiter.Config{
		Storage: storage,
		Max:     300,
	}))

	if os.Getenv("ENV") != "prod" {

		app.Use(requestid.New())

		app.Use(logger.New(logger.Config{
			Format: "${latency} ${time} [${ip}]:${port} ${locals:requestid} ${status} - ${method} ${path} ${error}\n",
		}))

	} else {

		app.Use(idempotency.New())

	}

	app.Use(recover.New())

	app.Use(cors.New())

	app.Use(helmet.New())

	app.Use(encryptcookie.New(encryptcookie.Config{
		Key: os.Getenv("COOKIE_ENC_KEY"),
	}))

	conn := db.Connect()

	defer conn.Release()

	db.Sqlc = gen.New(conn)

	api := app.Group("/api")

	api.Group("/user").Route("/", routes.UserRouter)

	api.Group("/products").Route("/", routes.ProductRouter)

	api.Group("/example").Route("/", routes.ExamplesRouter)

	log.Fatal(app.Listen(":" + os.Getenv("PORT")))

}
