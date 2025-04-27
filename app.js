const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const app = express();

// Configuración de la base de datos MySQL
const sequelize = new Sequelize('biblioteca', 'root', 'miNuevaContraseña', {
  host: 'localhost',
  dialect: 'mysql'
});

// Configurar Pug como motor de plantillas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app/views'));

// Middleware para parsear los datos de los formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const booksController = require('./app/controllers/booksController');
app.get('/', booksController.index);
app.post('/add', booksController.addBook);
app.get('/edit/:id', booksController.editBook);
app.post('/update/:id', booksController.updateBook);
app.get('/delete/:id', booksController.deleteBook);

// Puerto de escucha
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
