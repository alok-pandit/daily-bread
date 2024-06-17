package initiator

import (
	"log"
	"os"

	"github.com/alok-pandit/daily-bread/src/app"
	"github.com/alok-pandit/daily-bread/src/db"
	"github.com/alok-pandit/daily-bread/src/db/gen"
	_ "github.com/alok-pandit/daily-bread/src/docs"
	"github.com/alok-pandit/daily-bread/src/routes"
	"github.com/gofiber/swagger"
)

func Initialize() {

	app := app.GetApp()

	app.Get("/swagger/*", swagger.HandlerDefault)

	pool := db.ConnectPool()

	defer pool.Close()

	db.Sqlc = gen.New(pool)

	app.Group("/ws").Route("/", routes.WsRouter)

	api := app.Group("/api")

	api.Group("/user").Route("/", routes.UserRouter)

	api.Group("/products").Route("/", routes.ProductRouter)

	api.Group("/example").Route("/", routes.ExamplesRouter)

	log.Fatal(app.Listen(":" + os.Getenv("port")))

}
