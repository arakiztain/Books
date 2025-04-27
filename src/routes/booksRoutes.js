const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/', booksController.index);


router.get('/add', authenticateToken, (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  res.render('addBook');
});


router.get('/logout', authenticateToken, (req, res) => {

  res.clearCookie('token');
  res.redirect('/');

});


router.post('/add', authenticateToken, booksController.addBook);


router.get('/edit/:id', authenticateToken, booksController.editBook);
router.post('/update/:id', authenticateToken, booksController.updateBook);


router.post('/delete/:id', authenticateToken, booksController.deleteBook);

module.exports = router;
