package models

type CreateUserInput struct {
	Fullname string `json:"fullname"`
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type LoginAPIInputs struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type LoginAPIResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
