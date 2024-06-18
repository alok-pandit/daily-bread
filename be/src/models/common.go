package models

type ErrorResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ChatMessage struct {
	Msg    string `json:"msg"`
	Handle string `json:"handle"`
	RoomID string `json:"room_id"`
	UserID string `json:"user_id"`
}
