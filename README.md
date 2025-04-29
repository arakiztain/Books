# 📚 Gestión de Biblioteca Personal – Backend

Este proyecto forma parte de una aplicación diseñada para ayudar a usuarios como Roberto Díaz, un lector apasionado, a organizar su biblioteca personal, hacer seguimiento de sus lecturas y compartir su colección con amigos.

## 🧠 Descripción del Proyecto

El backend proporciona una API RESTful y vistas renderizadas con Pug que permiten gestionar una colección personal de libros. Incluye autenticación con JSON Web Tokens (JWT), middleware de protección de rutas y una interfaz web básica.

## 👤 Cliente Ficticio

**Roberto Díaz** – Ávido lector con una colección de ~500 libros que busca:

- Gestionar su biblioteca personal.
- Clasificar libros por género, autor, editorial, año y ubicación física (ej. "estantería 1").
- Registrar el estado de lectura de cada libro: leído, leyendo, pendiente.
- Compartir su colección con amigos (funcionalidad futura).

## ⚙️ Tecnologías Utilizadas

- **Node.js** + **Express** – Servidor backend.
- **MySQL** – Base de datos relacional.
- **Pug** – Motor de plantillas para renderizar vistas.
- **JWT** – Autenticación basada en tokens.
- **Docker** – Contenedorización del entorno.

## 📁 Estructura del Proyecto

```
/ (root)
│
├── src/                  
│   ├── config/            # Configuración de la base de datos y entorno
│   ├── controllers/       # Lógica de negocio para libros y autenticación
│   ├── middleware/        # Middleware de autenticación
│   ├── models/            # Definición de modelos de datos
│   ├── routes/            # Rutas para libros y autenticación
│
├── public/                # Archivos estáticos (CSS, imágenes, JS)
│
├── views/                 # Plantillas Pug
│
├── app.js                 # Punto de entrada de la aplicación
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## 🔐 Rutas de Autenticación (`/auth`)

- `GET /auth/register` – Muestra el formulario de registro.
- `POST /auth/register` – Registra un nuevo usuario.
- `GET /auth/login` – Muestra el formulario de login.
- `POST /auth/login` – Inicia sesión y genera un token.
- `GET /auth/logout` – Cierra sesión y elimina la cookie.

## 📚 Rutas de Gestión de Libros (`/books`)

- `GET /books/` – Muestra la lista de libros.
- `GET /books/add` – Muestra el formulario para añadir un libro (requiere autenticación).
- `POST /books/add` – Añade un libro a la base de datos (requiere autenticación).
- `GET /books/edit/:id` – Muestra el formulario para editar un libro (requiere autenticación).
- `POST /books/update/:id` – Actualiza los datos del libro (requiere autenticación).
- `POST /books/delete/:id` – Elimina un libro de la base de datos (requiere autenticación).
- `GET /books/logout` – Cierra sesión y redirige al inicio.

## 🐳 Docker

Para ejecutar el proyecto con Docker:

```bash
docker-compose up --build
```

## 🔐 Variables de Entorno

Crea un archivo `.env` con los siguientes valores:

```
DB_HOST=db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=biblioteca
JWT_SECRET=tu_clave_secreta
PORT=3000
```

## 📌 Próximas Mejoras

- Estadísticas de lectura.
- Puntuaciones o reseñas de libros.
- Compartir biblioteca con otros usuarios.
- Buscador y filtros avanzados por género, autor, etc.
