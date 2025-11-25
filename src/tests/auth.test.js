const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const User = require('../models/User');


beforeAll(async () => {
const uri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/fitness_api_test';
await mongoose.connect(uri);
await User.deleteMany({});
});


afterAll(async () => {
await mongoose.connection.close();
});


describe('Auth', () => {
test('register -> login flow', async () => {
const user = { name: 'Jhonata', email: 'jh@example.com', password: 'password' };
const resReg = await request(app).post('/api/v1/auth/register').send(user);
expect(resReg.statusCode).toBe(201);
expect(resReg.body).toHaveProperty('token');


const resLogin = await request(app).post('/api/v1/auth/login').send({ email: user.email, password: user.password });
expect(resLogin.statusCode).toBe(200);
expect(resLogin.body).toHaveProperty('token');
});
});