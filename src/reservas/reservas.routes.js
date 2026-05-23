const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/auth.middleware');

let reservas = [
  { id: 1, cliente: 'Carlos Perez', fecha: '2026-05-24', hora: '19:00', personas: 4, estado: 'confirmada' },
  { id: 2, cliente: 'Ana Lopez', fecha: '2026-05-25', hora: '20:00', personas: 2, estado: 'pendiente' }
];

router.get('/', authMiddleware, (req, res) => {
  res.json(reservas);
});

router.post('/', authMiddleware, (req, res) => {
  const { cliente, fecha, hora, personas } = req.body;
  if (!cliente || !fecha || !hora || !personas) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  const nueva = { id: reservas.length + 1, cliente, fecha, hora, personas, estado: 'pendiente' };
  reservas.push(nueva);
  res.status(201).json(nueva);
});

module.exports = router;
