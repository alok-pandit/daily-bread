package app

import (
	"encoding/json"
	"os"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/contrib/fiberzerolog"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/encryptcookie"
	"github.com/gofiber/fiber/v2/middleware/etag"
	"github.com/gofiber/fiber/v2/middleware/healthcheck"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/storage/rueidis"
	"github.com/rs/zerolog"
)

var RedisClient *redis.Client

func GetApp() *fiber.App {

	app := fiber.New(fiber.Config{
		Prefork:      false,
		ServerHeader: "Fiber",
		AppName:      "daily-bread",
		JSONEncoder:  json.Marshal,
		JSONDecoder:  json.Unmarshal,
	})

	// *INFO: CORS has to be the first middleware. Spent a whole day trying to figure out why sometimes it works and randomly sometimes it doesn't. Turns out, just had to make this the first midlleware!!!
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000/",
		AllowCredentials: true,
	}))

	limiterDB := rueidis.New(rueidis.Config{
		InitAddress: []string{os.Getenv("redis_url")},
		Username:    "",
		Password:    "",
		SelectDB:    1,
		Reset:       false,
		TLSConfig:   nil,
		CacheTTL:    5 * time.Minute,
	})

	cacheDB := rueidis.New(rueidis.Config{
		InitAddress: []string{os.Getenv("redis_url")},
		Username:    "",
		Password:    "",
		SelectDB:    0,
		Reset:       false,
		TLSConfig:   nil,
		CacheTTL:    30 * time.Minute,
	})

	app.Use(limiter.New(limiter.Config{
		Storage:    limiterDB,
		Expiration: 10 * time.Second,
		Max:        1000,
	}))

	app.Use(cache.New(cache.Config{
		Next: func(c *fiber.Ctx) bool {
			return c.Query("noCache") == "true"
		},
		Expiration:   30 * time.Minute,
		CacheControl: true,
		Storage:      cacheDB,
	}))

	app.Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))

	app.Use(etag.New(etag.Config{
		Weak: true,
	}))

	// if os.Getenv("env") != "prod" {

	app.Use(requestid.New())

	logger := zerolog.New(os.Stderr).With().Timestamp().Logger()

	app.Use(fiberzerolog.New(fiberzerolog.Config{
		Logger: &logger,
		Fields: []string{"ip", "port", "latency", "time", "status", "${locals:requestid}", "method", "url", "error"},
	}))

	// } else {

	// 	app.Use(idempotency.New())

	// }

	app.Use(recover.New())

	app.Use(helmet.New())

	app.Use(encryptcookie.New(encryptcookie.Config{
		Key: os.Getenv("cookie_enc_key"),
	}))

	app.Use(healthcheck.New())

	RedisClient = redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		DB:   9,
	})

	return app

}
