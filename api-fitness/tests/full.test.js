const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const HealthMeasure = require('../models/healthModel');

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://127.0.0.1:27017/api-fitness-test');
  }

  await User.deleteMany();
  await HealthMeasure.deleteMany();
}, 20000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('API Fitness – Testes completos', () => {
  let token;
  let measureId;

  // ----------------------------
  // 1) Registro
  // ----------------------------

  it('Deve registrar um novo usuário', async () => {
    const res = await request(app).post('/api/v1/users/register').send({
      name: 'Jhonata',
      email: 'jhona@example.com',
      password: 'senha123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  // tentativa de registro com e-mail duplicado
  it('Não deve registrar usuário com e-mail duplicado', async () => {
    const res = await request(app).post('/api/v1/users/register').send({
      name: 'Outro',
      email: 'jhona@example.com',
      password: '123456'
    });

    expect(res.statusCode).toBe(400);
  });

  // ----------------------------
  // 2) Login
  // ----------------------------

  it('Deve fazer login', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'jhona@example.com',
      password: 'senha123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
  });

  // ----------------------------
  // 3) Perfil
  // ----------------------------

  it('Deve retornar erro 401 sem token', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.statusCode).toBe(401);
  });

  it('Deve retornar o perfil autenticado', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('jhona@example.com');
  });

  // ----------------------------
  // 4) CRUD HealthMeasure
  // ----------------------------

  it('Deve criar uma nova medida de saúde', async () => {
    const res = await request(app)
      .post('/api/v1/health')
      .set('Authorization', `Bearer ${token}`)
      .send({
        weight: 82,
        height: 1.80,
        date: '2025-01-01'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');

    measureId = res.body._id;
  });

  it('Deve listar todas as medidas do usuário', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve buscar uma medida por ID', async () => {
    const res = await request(app)
      .get(`/api/v1/health/${measureId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(measureId);
  });

  it('Deve atualizar uma medida', async () => {
    const res = await request(app)
      .put(`/api/v1/health/${measureId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        weight: 80,
        height: 1.80
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.weight).toBe(80);
  });

  it('Deve deletar uma medida', async () => {
    const res = await request(app)
      .delete(`/api/v1/health/${measureId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
