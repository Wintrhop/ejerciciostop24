const server = require("supertest");
const { connect, disconnected, cleanup } = require("../../db");
const app = require("../../app");

describe("User", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });
  it("should create a user correctly", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    const res = await server(app).post("/auth/local/signup").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });
  it("should not create a user when email is invalid", async () => {
    const user = { email: "jhontest.com", password: "123456" };
    const res = await server(app).post("/auth/local/signup").send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(
      /You must enter a valid email example@example.com/i
    );
  });
  it("should not create a user when password is invalid", async () => {
    const user = { email: "jhon@test.com", password: "123" };
    const res = await server(app).post("/auth/local/signup").send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/password must have at least 5 characters/i);
  });
  it("should login a user correctly", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    await server(app).post("/auth/local/signup").send(user);

    const res = await server(app).post("/auth/local/login").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/user login successfully/i);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });
  it("should not login a user if incorrect password", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    await server(app).post("/auth/local/signup").send(user);

    const res = await server(app)
      .post("/auth/local/login")
      .send({ email: "jhon@test.com", password: "1" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/email or password invalid/i);
  });
  it("should not login a user if incorrect email", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    await server(app).post("/auth/local/signup").send(user);

    const res = await server(app)
      .post("/auth/local/login")
      .send({ email: "jon@test.com", password: "123456" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/email or password invalid/i);
  });
});
