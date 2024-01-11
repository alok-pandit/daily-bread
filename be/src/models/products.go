package models

type GetProductsInput struct {
	Before string `json:"before" validate:"omitempty"`
	After  string `json:"after" validate:"omitempty"`
	First  int32  `json:"first" validate:"omitempty,max=100,min=10"`
	Last   int32  `json:"last" validate:"omitempty,max=100,min=10"`
}
