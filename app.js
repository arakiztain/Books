const express = require('express');
const path = require('path');
const sequelize = require('./app/config/database'); // Importa la instancia de sequelize
const app = express();

// Verificar conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida correctamente');
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err.message);
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

// Ruta GET para mostrar el formulario de agregar libro
app.get('/add', (req, res) => {
  res.render('addBook');  // Asegúrate de que tienes una vista 'addBook.pug'
});

// Ruta POST para agregar el libro
app.post('/add', booksController.addBook);

// Puerto de escucha
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
