package models

type CreateUserInput struct {
	Fullname string `json:"fullname"`
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type CreateUserResponse struct {
	Message string `json:"message" validate:"required"`
	Success bool   `json:"success" validate:"required"`
}

type LoginAPIInput struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type LoginAPIResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
