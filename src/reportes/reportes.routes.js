const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/auth.middleware');

router.get('/ventas', authMiddleware, (req, res) => {
  res.json({
    fecha: new Date().toISOString().split('T')[0],
    totalPedidos: 2,
    totalVentas: 57000,
    pedidosPorEstado: { pendiente: 1, entregado: 1 }
  });
});

module.exports = router;
