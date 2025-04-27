const Book = require('../models/book');

// Mostrar todos los libros
exports.index = async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books }); // Renderiza la vista 'index.pug' y pasa los libros
};

// Agregar un nuevo libro
exports.addBook = async (req, res) => {
  const { title, author, publisher, year, genre, location, status } = req.body;
  await Book.create({
    title,
    author,
    publisher,
    year,
    genre,
    location,
    status
  });
  res.redirect('/'); // Redirige a la página principal después de agregar un libro
};

// Editar un libro existente
exports.editBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('edit', { book }); // Renderiza la vista 'edit.pug' y pasa el libro
};

// Actualizar un libro
exports.updateBook = async (req, res) => {
  const { title, author, publisher, year, genre, location, status, rating, comment } = req.body;
  await Book.update({
    title,
    author,
    publisher,
    year,
    genre,
    location,
    status,
    rating,
    comment
  }, {
    where: { id: req.params.id }
  });
  res.redirect('/'); // Redirige a la página principal después de actualizar el libro
};
// Eliminar un libro
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

  await Book.destroy({
    where: { id: bookId }
  });

  res.redirect('/');
};
