const request = require('supertest');
const app = require('../src/index');

let tokenAdmin;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@sigr.com', password: 'admin123' });
  tokenAdmin = res.body.token;
});

describe('Integracion - Health y Menu (publico)', () => {
  test('GET /health - sistema operativo', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.sistema).toBe('SIGR');
  });

  test('GET /api/menu - lista de platos sin autenticacion', async () => {
    const res = await request(app).get('/api/menu');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('Integracion - Pedidos (requiere autenticacion)', () => {
  test('GET /api/pedidos - sin token retorna 401', async () => {
    const res = await request(app).get('/api/pedidos');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/pedidos - con token valido retorna lista', async () => {
    const res = await request(app)
      .get('/api/pedidos')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/pedidos - crear pedido nuevo', async () => {
    const res = await request(app)
      .post('/api/pedidos')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ mesa: 7, items: ['Ajiaco', 'Jugo'], total: 29000 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.estado).toBe('pendiente');
  });
});

describe('Integracion - Reservas (requiere autenticacion)', () => {
  test('POST /api/reservas - crear reserva nueva', async () => {
    const res = await request(app)
      .post('/api/reservas')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ cliente: 'Pedro Test', fecha: '2026-06-01', hora: '19:30', personas: 3 });
    expect(res.statusCode).toBe(201);
    expect(res.body.estado).toBe('pendiente');
  });
});
