CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  image_id INT REFERENCES images(id),
  like_type BOOLEAN NOT NULL
);