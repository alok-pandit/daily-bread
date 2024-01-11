CREATE TABLE
  IF NOT EXISTS products (
    id VARCHAR PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    description VARCHAR DEFAULT '',
    price DECIMAL(13, 2),
    images VARCHAR [] DEFAULT ARRAY ['https://media.istockphoto.com/id/1412723839/photo/online-buying-and-delivery-concept.jpg?s=1024x1024&w=is&k=20&c=7sXiIZMOk8cisEUrRXNfL1AVxXebokEMxEsR3i9N7v0=':: text],
    quantity INT DEFAULT 1000
  );


CREATE INDEX id_idx ON products ((lower(id))) INCLUDE (name, description)
WITH
  (deduplicate_items = off);