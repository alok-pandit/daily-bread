package handlers

import (
	"context"
	"log"

	"github.com/alok-pandit/daily-bread/src/app"
	"github.com/go-redis/redis/v8"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

var connectedClients = make(map[string]*websocket.Conn)       // Map username to connection
var roomClients = make(map[string]map[string]*websocket.Conn) // Map room ID to map of username to connection (mutex protected)

func WebSocketHandler(c *websocket.Conn) {
	defer c.Close()

	defer app.RedisClient.Close()

	room_id := c.Params("room_id")
	user_id := c.Params("user_id")
	subscriber := app.RedisClient.Subscribe(context.Background(), room_id)

	go subscription(c, subscriber)

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

		if err := app.RedisClient.Publish(context.Background(), room_id, msg).Err(); err != nil {
			log.Println("publish:", err)
		}

		if roomClients[room_id][c.Params("user_id")] == nil ||
			connectedClients[user_id] == nil ||
			roomClients[room_id] == nil {
			go manageRoom(c)
		}

	}
}

func manageRoom(c *websocket.Conn) {
	user_id := c.Params("user_id")

	room_id := c.Params("room_id")

	connectedClients[user_id] = c
	if roomClients[room_id] == nil {
		roomClients[room_id] = make(map[string]*websocket.Conn)
	}
	roomClients[room_id][user_id] = c

}

func deliverMessages(msg []byte, c *websocket.Conn) {

	if err := c.WriteMessage(2, msg); err != nil {
		log.Println("write:", err)
	}

}

func subscription(c *websocket.Conn, subscriber *redis.PubSub) {

	for {
		m, err := subscriber.ReceiveMessage(context.Background())
		if err != nil {
			log.Println("subscribe:", err)
		}

		go deliverMessages([]byte(m.Payload), c)
	}
}

func WsUpgradeHandler(c *fiber.Ctx) error {

	if websocket.IsWebSocketUpgrade(c) {
		c.Locals("allowed", true)
		return c.Next()
	}
	return fiber.ErrUpgradeRequired

}
