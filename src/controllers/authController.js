const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register User
exports.register = async (req, res) => {
  const { name, password } = req.body;

  const existingUser = await User.findOne({ where: { username: name } });
  if (existingUser) {
    return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username: name,
    password: hashedPassword
  });

  const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Guardar el token en las cookies
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  res.redirect('/');
};

//Sesion
exports.login = async (req, res) => {
  const { name, password } = req.body;
  
  const user = await User.findOne({ where: { username: name } });
  if (!user) {
    return res.status(400).json({ message: 'Usuario incorrecto' });
  }

  //Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Guardar el token en las cookies
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  res.redirect('/');
};
