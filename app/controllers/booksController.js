const Book = require('../models/book');

// Mostrar todos los libros
exports.index = async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books });
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
  res.redirect('/');
};

// Editar un libro existente
exports.editBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('edit', { book });
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
  res.redirect('/');
};

// Eliminar un libro
exports.deleteBook = async (req, res) => {
  await Book.destroy({
    where: { id: req.params.id }
  });
  res.redirect('/');
};
