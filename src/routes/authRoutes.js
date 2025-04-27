const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar formulario de registro (GET)
router.get('/register', (req, res) => {
    res.render('register');  // Renderiza una vista llamada 'register.pug'
  });
  
// Ruta para registrarse
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;
