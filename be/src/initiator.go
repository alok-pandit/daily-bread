package initiator

import (
	"log"
	"os"
	"time"

	"github.com/alok-pandit/daily-bread/src/db"
	"github.com/alok-pandit/daily-bread/src/db/gen"
	_ "github.com/alok-pandit/daily-bread/src/docs"
	"github.com/alok-pandit/daily-bread/src/routes"
	"github.com/goccy/go-json"
	"github.com/gofiber/contrib/websocket"
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
	"github.com/gofiber/swagger"
)

func Initialize() {

	app := fiber.New(fiber.Config{
		Prefork:      false,
		ServerHeader: "Fiber",
		AppName:      "daily-bread",
		JSONEncoder:  json.Marshal,
		JSONDecoder:  json.Unmarshal,
	})

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

	// logger := zerolog.New(os.Stderr).With().Timestamp().Logger()

	// app.Use(fiberzerolog.New(fiberzerolog.Config{
	// 	Logger: &logger,
	// 	Fields: []string{"ip", "port", "latency", "time", "status", "${locals:requestid}", "method", "url", "error"},
	// }))

	// } else {

	// 	app.Use(idempotency.New())

	// }

	app.Use(recover.New())

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	app.Use(helmet.New())

	app.Use(encryptcookie.New(encryptcookie.Config{
		Key: os.Getenv("cookie_enc_key"),
	}))

	app.Use(healthcheck.New())

	pool := db.ConnectPool()

	defer pool.Close()

	db.Sqlc = gen.New(pool)

	app.Get("/swagger/*", swagger.HandlerDefault)

	app.Use("/ws", func(c *fiber.Ctx) error {

		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}

		return fiber.ErrUpgradeRequired

	})

	app.Get("/ws/:id", websocket.New(func(c *websocket.Conn) {
		// c.Locals is added to the *websocket.Conn
		// log.Println(c.Locals("allowed"))  // true
		// log.Println(c.Params("id"))       // 123
		// log.Println(c.Query("v"))         // 1.0
		// log.Println(c.Cookies("session")) // ""

		// websocket.Conn bindings https://pkg.go.dev/github.com/fasthttp/websocket?tab=doc#pkg-index
		var (
			mt  int
			msg []byte
			err error
		)
		for {
			if mt, msg, err = c.ReadMessage(); err != nil {
				log.Println("read:", err)
				break
			}
			log.Printf("recv: %s", msg)

			if err = c.WriteMessage(mt, msg); err != nil {
				log.Println("write:", err)
				break
			}
		}

	}))

	api := app.Group("/api")

	api.Group("/user").Route("/", routes.UserRouter)

	api.Group("/products").Route("/", routes.ProductRouter)

	api.Group("/example").Route("/", routes.ExamplesRouter)

	log.Fatal(app.Listen(":" + os.Getenv("port")))

}
