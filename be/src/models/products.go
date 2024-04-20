package models

type GetProductsInput struct {
	Before string `json:"before" validate:"omitempty"`
	After  string `json:"after" validate:"omitempty"`
	First  int32  `json:"first" validate:"omitempty,max=100,min=5"`
	Last   int32  `json:"last" validate:"omitempty,max=100,min=10"`
}

type GetProductsResponse struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Price       float64  `json:"price"`
	Images      []string `json:"images"`
	Quantity    int      `json:"quantity"`
	LastCursor  string   `json:"lastCursor"`
	FirstCursor string   `json:"firstCursor"`
	TotalCount  int32    `json:"totalCount"`
}
