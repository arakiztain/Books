const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar formulario de registro (GET)
router.get('/register', (req, res) => {
    res.render('register');
  });
  
// Ruta para registrarse
router.post('/register', authController.register);

// Mostrar formulario de login (GET)
router.get('/login', (req, res) => {
    res.render('login'); 
  });
  
// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;
