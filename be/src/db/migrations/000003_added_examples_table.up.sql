CREATE TABLE
  IF NOT EXISTS counter (
    id serial NOT NULL PRIMARY KEY,
    count integer NOT NULL DEFAULT 1
  );