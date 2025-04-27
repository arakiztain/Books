const Book = require('../models/book');
const jwt = require('jsonwebtoken');

//Show all
exports.index = async (req, res) => {
  try {
    const token = req.cookies?.token;
    let user = null;

    if (token) {
      user = jwt.verify(token, process.env.JWT_SECRET);
    }

    //Filter
    const books = user ? await Book.findAll({ where: { userId: user.id } }) : [];

    res.render('index', { books, user });
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).send('Error en el servidor');
  }
};

//Add
exports.addBook = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('No autorizado');
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const { title, author, publisher, year, genre, location, status } = req.body;

    await Book.create({
      title,
      author,
      publisher,
      year,
      genre,
      location,
      status,
      userId: user.id
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error al agregar libro:', error);
    res.status(500).send('Error al agregar libro');
  }
};

//Edite
exports.editBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('edit', { book }); 
};

//Update
exports.updateBook = async (req, res) => {
  const { status, rating, comment } = req.body;

  await Book.update({
    status
  }, {
    where: { id: req.params.id }
  });
  res.redirect('/');
};

//Delete
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

  await Book.destroy({
    where: { id: bookId }
  });

  res.redirect('/');
};
