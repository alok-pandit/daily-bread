package db

import (
	"context"
	"log"

	"github.com/alok-pandit/daily-bread/src/db/gen"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/lib/pq"
)

var Sqlc *gen.Queries

func Connect() *pgxpool.Conn {

	connPool, err := pgxpool.NewWithConfig(context.Background(), Config())
	if err != nil {
		log.Fatal("Error while creating connection to the database!!")
	}

	conn, err := connPool.Acquire(context.Background())
	if err != nil {
		log.Fatal("Error while acquiring conn from the database pool!!")
	}

	err = conn.Ping(context.Background())
	if err != nil {
		log.Fatal("Could not ping database")
	}

	return conn

}
