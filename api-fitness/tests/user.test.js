const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://127.0.0.1:27017/api-fitness-test');
  }
  await User.deleteMany();
}, 20000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Usuários', () => {
  let token;

  it('Registrar usuário', async () => {
    const res = await request(app).post('/api/v1/users/register').send({
      name: 'Jhonata Matos',
      email: 'jhona@example.com',
      password: 'senha123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Login usuário', async () => {
    const res = await request(app).post('/api/v1/users/login').send({
      email: 'jhona@example.com',
      password: 'senha123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('Obter perfil', async () => {
    const res = await request(app).get('/api/v1/users/me').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('jhona@example.com');
  });
});
