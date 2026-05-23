const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sigr_secret_key_2026';

// Base de datos simulada de usuarios
const usuarios = [
  {
    id: 1,
    nombre: 'Admin SIGR',
    email: 'admin@sigr.com',
    password: bcrypt.hashSync('admin123', 10),
    rol: 'administrador'
  },
  {
    id: 2,
    nombre: 'Mesero Juan',
    email: 'mesero@sigr.com',
    password: bcrypt.hashSync('mesero123', 10),
    rol: 'mesero'
  },
  {
    id: 3,
    nombre: 'Cliente Maria',
    email: 'cliente@sigr.com',
    password: bcrypt.hashSync('cliente123', 10),
    rol: 'cliente'
  }
];

const login = async (email, password) => {
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    throw new Error('Credenciales invalidas');
  }

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) {
    throw new Error('Credenciales invalidas');
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  };
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token invalido o expirado');
  }
};

module.exports = { login, verificarToken };
