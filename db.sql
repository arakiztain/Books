CREATE DATABASE IF NOT EXISTS biblioteca;

USE biblioteca;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255),
  year INT,
  genre VARCHAR(255),
  location VARCHAR(255),
  status ENUM('pendiente', 'leyendo', 'leído') DEFAULT 'pendiente',
  rating INT,
  comment TEXT
);
