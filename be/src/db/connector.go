package db

import (
	"context"
	"fmt"
	"os"

	"github.com/alok-pandit/daily-bread/src/db/gen"

	"github.com/jackc/pgx/v5"
	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/lib/pq"
)

var Sqlc *gen.Queries

func Connect() *pgx.Conn {

	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	return conn
}
