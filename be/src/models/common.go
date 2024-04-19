package models

type ErrorResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
