-- counter.sql
-- name: GetCounter :one
SELECT
  count
from
  counter
WHERE
  id = 1 FOR
UPDATE
;


-- name: IncrementCounter :exec
UPDATE
  counter
SET
  count = (
    SELECT
      count
    FROM
      counter
    WHERE
      id = 1
  ) + 1
WHERE
  id = 1;


-- name: IncrementCounterForUpdate :exec
UPDATE
  counter
SET
  count = (
    SELECT
      count
    FROM
      counter
    WHERE
      id = 1 FOR
    UPDATE
  ) + 1
WHERE
  id = 1;