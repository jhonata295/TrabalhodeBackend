const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let app;
let mongoServer;
let token;
let createdUserId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = "test_secret";
  app = require("../server");

  // register and login to get token
  await request(app).post("/api/v1/auth/register").send({
    name: "Admin",
    email: "admin@example.com",
    password: "123456"
  });

  const login = await request(app).post("/api/v1/auth/login").send({
    email: "admin@example.com",
    password: "123456"
  });

  token = login.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Users CRUD protected", () => {
  test("POST /api/v1/users -> create user", async () => {
    const res = await request(app).post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "User A", email: "usera@example.com", password: "123456" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    createdUserId = res.body.id;
  });

  test("GET /api/v1/users -> list users", async () => {
    const res = await request(app).get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test("GET /api/v1/users/:id -> get by id", async () => {
    const res = await request(app).get(`/api/v1/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", "usera@example.com");
  });

  test("PUT /api/v1/users/:id -> update", async () => {
    const res = await request(app).put(`/api/v1/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "User A Updated" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "User A Updated");
  });

  test("DELETE /api/v1/users/:id -> delete", async () => {
    const res = await request(app).delete(`/api/v1/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});
