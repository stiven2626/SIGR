const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/auth.middleware');

let pedidos = [
  { id: 1, mesa: 3, items: ['Bandeja paisa', 'Jugo de lulo'], estado: 'pendiente', total: 35000 },
  { id: 2, mesa: 5, items: ['Ajiaco', 'Agua'], estado: 'entregado', total: 22000 }
];

router.get('/', authMiddleware, (req, res) => {
  res.json(pedidos);
});

router.post('/', authMiddleware, (req, res) => {
  const { mesa, items, total } = req.body;
  if (!mesa || !items || !total) {
    return res.status(400).json({ error: 'Mesa, items y total son requeridos' });
  }
  const nuevo = { id: pedidos.length + 1, mesa, items, estado: 'pendiente', total };
  pedidos.push(nuevo);
  res.status(201).json(nuevo);
});

router.put('/:id/estado', authMiddleware, (req, res) => {
  const pedido = pedidos.find(p => p.id === parseInt(req.params.id));
  if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
  pedido.estado = req.body.estado;
  res.json(pedido);
});

module.exports = router;
