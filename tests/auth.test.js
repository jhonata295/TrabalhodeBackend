const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = "test_secret";
  app = require("../server");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth: register & login", () => {
  test("Should register a user and return 201", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Teste",
      email: "teste@example.com",
      password: "123456"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("email", "teste@example.com");
  });

  test("Should login and return token", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "teste@example.com",
      password: "123456"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
