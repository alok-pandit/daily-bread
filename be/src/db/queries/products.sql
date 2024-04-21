-- products.sql
-- name: GetProductByID :one
SELECT
  *
FROM
  products
WHERE
  id = $1;


-- name: GetFirstNProducts :many
WITH
  SelectedProducts AS (
    SELECT
      *,
      COUNT(*) OVER () AS total_count
    FROM
      products
    ORDER BY
      id ASC
    LIMIT
      $1
  )
SELECT
  *,
  LAST_VALUE(id) OVER () AS last_cursor,
  FIRST_VALUE(id) OVER () AS first_cursor
FROM
  SelectedProducts
ORDER BY
  id ASC;


-- name: GetLastNProducts :many
WITH
  SelectedProducts AS (
    SELECT
      *,
      COUNT(*) OVER () AS total_count
    FROM
      products
    ORDER BY
      id DESC
    LIMIT
      $1
  )
SELECT
  *,
  LAST_VALUE(id) OVER () AS last_cursor,
  FIRST_VALUE(id) OVER () AS first_cursor
FROM
  SelectedProducts
ORDER BY
  id ASC;


-- name: ListNProductsAfter :many
WITH
  SelectedProducts AS (
    SELECT
      *,
      COUNT(*) OVER () AS total_count
    FROM
      products
    WHERE
      id > $1
    ORDER BY
      id ASC
    LIMIT
      $2
  )
SELECT
  *,
  LAST_VALUE(id) OVER () AS last_cursor,
  FIRST_VALUE(id) OVER () AS first_cursor
FROM
  SelectedProducts
ORDER BY
  id ASC;


-- name: ListNProductsBefore :many
WITH
  SelectedProducts AS (
    SELECT
      *,
      COUNT(*) OVER () AS total_count
    FROM
      products
    WHERE
      id < $1
    ORDER BY
      id DESC
    LIMIT
      $2
  )
SELECT
  *,
  LAST_VALUE(id) OVER () AS last_cursor,
  FIRST_VALUE(id) OVER () AS first_cursor
FROM
  SelectedProducts
ORDER BY
  id ASC;