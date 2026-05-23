const request = require('supertest');
const app = require('../src/index');

describe('Auth - Modulo de Autenticacion SIGR', () => {

  test('POST /api/auth/login - login exitoso con admin', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@sigr.com', password: 'admin123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.usuario.rol).toBe('administrador');
  });

  test('POST /api/auth/login - login exitoso con mesero', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'mesero@sigr.com', password: 'mesero123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.usuario.rol).toBe('mesero');
  });

  test('POST /api/auth/login - credenciales invalidas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@sigr.com', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/auth/login - email inexistente', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@sigr.com', password: '123456' });
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/auth/login - campos faltantes', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@sigr.com' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/auth/perfil - sin token retorna 401', async () => {
    const res = await request(app).get('/api/auth/perfil');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/auth/perfil - con token valido retorna perfil', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@sigr.com', password: 'admin123' });
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/auth/perfil')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.usuario).toHaveProperty('email');
  });

});
