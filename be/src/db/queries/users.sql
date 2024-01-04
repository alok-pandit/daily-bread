-- users.sql
-- name: GetUsers :one
SELECT
  username,
  id,
  password
FROM
  users
WHERE
  username = $1;


-- name: ListUers :many
SELECT
  *
FROM
  users
ORDER BY
  full_name;


-- name: CreateUser :exec
INSERT INTO
  users (id, full_name, username, PASSWORD)
VALUES
  ($1, $2, $3, $4);


-- name: DeleteUser :exec
DELETE FROM
  users
WHERE
  id = $1;
