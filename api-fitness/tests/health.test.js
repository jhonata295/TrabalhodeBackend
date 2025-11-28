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
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Medidas de Saúde', () => {
  let token;
  let measureId;

  it('Registrar usuário e gerar token', async () => {
    await request(app).post('/api/v1/users/register').send({
      name: 'Mario Victor',
      email: 'mario@example.com',
      password: 'senha123'
    });

    const res = await request(app).post('/api/v1/users/login').send({
      email: 'mario@example.com',
      password: 'senha123'
    });

    token = res.body.token;
  });

  it('Criar medida', async () => {
    const res = await request(app)
      .post('/api/v1/health')
      .set('Authorization', `Bearer ${token}`)
      .send({
        weight: 75,
        height: 1.8,
        date: '2025-11-25'
      });

    expect(res.statusCode).toBe(201);
    measureId = res.body._id;
  });

  it('Listar medidas', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Atualizar medida', async () => {
    const res = await request(app)
      .put(`/api/v1/health/${measureId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        weight: 78
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.weight).toBe(78);
  });

  it('Deletar medida', async () => {
    const res = await request(app)
      .delete(`/api/v1/health/${measureId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Medida deletada com sucesso');
  });
});
