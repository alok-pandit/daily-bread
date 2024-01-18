package initiator

import (
	"log"
	"os"
	"time"

	"github.com/alok-pandit/daily-bread/src/db"
	"github.com/alok-pandit/daily-bread/src/db/gen"
	"github.com/alok-pandit/daily-bread/src/routes"
	"github.com/gofiber/contrib/fiberzerolog"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/encryptcookie"
	"github.com/gofiber/fiber/v2/middleware/etag"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/idempotency"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/storage/rueidis"
	"github.com/rs/zerolog"
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

	limiterDB := rueidis.New(rueidis.Config{
		InitAddress: []string{"localhost:6379"},
		Username:    "",
		Password:    "",
		SelectDB:    1,
		Reset:       false,
		TLSConfig:   nil,
		CacheTTL:    15 * time.Minute,
	})

	cacheDB := rueidis.New(rueidis.Config{
		InitAddress: []string{"localhost:6379"},
		Username:    "",
		Password:    "",
		SelectDB:    0,
		Reset:       false,
		TLSConfig:   nil,
		CacheTTL:    30 * time.Minute,
	})

	app.Use(limiter.New(limiter.Config{
		Storage:    limiterDB,
		Expiration: 15 * time.Minute,
		Max:        25000,
	}))

	app.Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))

	app.Use(cache.New(cache.Config{
		Next: func(c *fiber.Ctx) bool {
			return c.Query("noCache") == "true"
		},
		Expiration:   30 * time.Minute,
		CacheControl: true,
		Storage:      cacheDB,
	}))

	app.Use(etag.New(etag.Config{
		Weak: true,
	}))

	if os.Getenv("ENV") != "prod" {

		app.Use(requestid.New())

		logger := zerolog.New(os.Stderr).With().Timestamp().Logger()

		app.Use(fiberzerolog.New(fiberzerolog.Config{
			Logger: &logger,
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

	app.Use(healthcheck.New())

	conn := db.Connect()

	defer conn.Release()

	db.Sqlc = gen.New(conn)

	api := app.Group("/api")

	api.Group("/user").Route("/", routes.UserRouter)

	api.Group("/products").Route("/", routes.ProductRouter)

	api.Group("/example").Route("/", routes.ExamplesRouter)

	log.Fatal(app.Listen(":" + os.Getenv("PORT")))

}
