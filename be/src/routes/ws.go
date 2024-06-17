package routes

import (
	"github.com/alok-pandit/daily-bread/src/handlers"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

var cfg = websocket.Config{
	EnableCompression: true,
	RecoverHandler: func(conn *websocket.Conn) {
		if err := recover(); err != nil {
			conn.WriteJSON(fiber.Map{"customError": "error occurred"})
		}
	},
}

func WsRouter(router fiber.Router) {

	router.Use("/", handlers.WsUpgradeHandler)

	router.Get("/:id<string>/:room_id<string>/:type<string>/:nonce<int>?", websocket.New(handlers.WebSocketHandler, cfg))

}
