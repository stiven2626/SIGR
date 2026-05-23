const express = require('express');
const router = express.Router();

const menu = [
  { id: 1, nombre: 'Bandeja paisa', categoria: 'platos fuertes', precio: 28000, disponible: true },
  { id: 2, nombre: 'Ajiaco bogotano', categoria: 'platos fuertes', precio: 22000, disponible: true },
  { id: 3, nombre: 'Empanadas (3)', categoria: 'entradas', precio: 9000, disponible: true },
  { id: 4, nombre: 'Jugo de lulo', categoria: 'bebidas', precio: 7000, disponible: true },
  { id: 5, nombre: 'Tres leches', categoria: 'postres', precio: 12000, disponible: true }
];

router.get('/', (req, res) => {
  res.json(menu);
});

router.get('/categoria/:cat', (req, res) => {
  const filtrado = menu.filter(p => p.categoria === req.params.cat);
  res.json(filtrado);
});

module.exports = router;
