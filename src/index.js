const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./auth/auth.routes');
const pedidosRoutes = require('./pedidos/pedidos.routes');
const reservasRoutes = require('./reservas/reservas.routes');
const menuRoutes = require('./menu/menu.routes');
const reportesRoutes = require('./reportes/reportes.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de salud del sistema
app.get('/health', (req, res) => {
  res.json({ status: 'OK', sistema: 'SIGR', version: '1.0.0' });
});

// Rutas del sistema
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reportes', reportesRoutes);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SIGR corriendo en puerto ${PORT}`);
  });
}

module.exports = app;