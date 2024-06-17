package handlers

import (
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

type Message struct {
	Message string `json:"msg"`
}

var connectedClients = make(map[string]*websocket.Conn)       // Map username to connection
var roomClients = make(map[string]map[string]*websocket.Conn) // Map room ID to map of username to connection (mutex protected)

func WebSocketHandler(c *websocket.Conn) {
	defer c.Close()

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

		log.Printf("recv: %s %+v", msg, mt)

		go deliverMessages(&mt, msg, c)
	}
}

func deliverMessages(mt *int, msg []byte, c *websocket.Conn) {

	user_id := c.Params("id")

	room_id := c.Params("room_id")

	t := c.Params("type")

	switch t {

	case "connect":
		connectedClients[user_id] = c
		if roomClients[room_id] == nil {
			roomClients[room_id] = make(map[string]*websocket.Conn)
		}
		roomClients[room_id][user_id] = c

	default:
	}

	if err := c.WriteMessage(*mt, msg); err != nil {
		log.Println("write:", err)
	}

}

func WsUpgradeHandler(c *fiber.Ctx) error {

	if websocket.IsWebSocketUpgrade(c) {
		c.Locals("allowed", true)
		return c.Next()
	}
	return fiber.ErrUpgradeRequired

}
