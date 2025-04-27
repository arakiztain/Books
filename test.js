const bcrypt = require('bcryptjs');

// Contraseña ingresada por el usuario
const passwordToCheck = '12345';  // La contraseña que el usuario ingresa
// Hash almacenado en la base de datos
const hashedPassword = '$2b$10$CtJxHza9EfwkgRNelHPbaOh6zjtLits/SUfKqzx1F3ENdwYaLozCK';  // El hash de la contraseña almacenada en la base de datos

// Comparar la contraseña ingresada con el hash almacenado
bcrypt.compare(passwordToCheck, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error(err);
  } else {
    console.log(isMatch ? '¡Las contraseñas coinciden!' : 'Las contraseñas NO coinciden');
  }
});
