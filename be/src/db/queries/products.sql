-- products.sql
-- name: GetProductByID :one
SELECT
  *
FROM
  product
WHERE
  id = $1;


-- name: ListProducts :many
WITH
  SelectedProducts AS (
    SELECT
      *
    FROM
      product
    WHERE
      id < $1
    ORDER BY
      id DESC
    LIMIT
      $2
  )
SELECT
  *,
  LAST(id) OVER () AS last_cursor
FROM
  SelectedProducts;