const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// Ruta para mostrar todos los libros (Página principal)
router.get('/', booksController.index);

// Ruta GET para mostrar el formulario de agregar libro
router.get('/add', (req, res) => {
  res.render('addBook');  // Renderiza la vista 'addBook.pug'
});

// Ruta POST para agregar un libro
router.post('/add', booksController.addBook);

// Ruta para editar un libro
router.get('/edit/:id', booksController.editBook);
router.post('/update/:id', booksController.updateBook);

// Ruta para eliminar un libro
router.post('/delete/:id', booksController.deleteBook);

module.exports = router;
