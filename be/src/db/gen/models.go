// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package gen

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type Counter struct {
	ID    int32 `db:"id" json:"id"`
	Count int32 `db:"count" json:"count"`
}

type Product struct {
	ID          string         `db:"id" json:"id"`
	Name        string         `db:"name" json:"name"`
	Description pgtype.Text    `db:"description" json:"description"`
	Price       pgtype.Numeric `db:"price" json:"price"`
	Images      []string       `db:"images" json:"images"`
	Quantity    pgtype.Int4    `db:"quantity" json:"quantity"`
}

type User struct {
	ID           string      `db:"id" json:"id"`
	Fullname     string      `db:"fullname" json:"fullname"`
	Username     string      `db:"username" json:"username"`
	Password     string      `db:"password" json:"password"`
	RefreshToken pgtype.Text `db:"refresh_token" json:"refreshToken"`
}
