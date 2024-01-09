-- users.sql
-- name: GetUser :one
SELECT
  id,
  password
FROM
  users
WHERE
  username = $1;


-- name: GetUserByID :one
SELECT
  username,
  fullname,
  password
FROM
  users
WHERE
  id = $1;

-- name: ListUsers :many
SELECT
  *
FROM
  users
ORDER BY
  fullname;


-- name: CreateUser :exec
INSERT INTO
  users (id, fullname, username, PASSWORD)
VALUES
  ($1, $2, $3, $4);


-- name: DeleteUser :exec
DELETE FROM
  users
WHERE
  id = $1;
