const express = require('express');
const router = express.Router();
const { login } = require('./auth.service');
const authMiddleware = require('./auth.middleware');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password requeridos' });
    }
    const resultado = await login(email, password);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ usuario: req.usuario });
});

module.exports = router;
