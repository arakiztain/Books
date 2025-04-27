const express = require('express');
const path = require('path');
const sequelize = require('./src/config/database');
const booksRoutes = require('./src/routes/booksRoutes');
const authRoutes = require('./src/routes/authRoutes');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cookieParser());


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
app.set('views', path.join(__dirname, 'src/views'));

// Middleware para parsear los datos de los formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas
app.use('/', booksRoutes);
app.use('/auth', authRoutes);

// Puerto de escucha
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
