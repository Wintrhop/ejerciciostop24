const server = require("supertest");
const { connect, disconnected, cleanup } = require("../../db");
const app = require("../../app");

describe("Favs", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnected();
  });
  it("should create a favlist correctly", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    const favList = {
      name:"musica",
    }
    const prev = await server(app).post("/auth/local/signup").send(user);
    const res = await server(app).post("/api/favs/").set('Authorization',`Bearer ${prev.body.data.token}`).send(favList);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/Favorites Created/i);
    
  });
  it ("should not create a favorite List without token", async()=>{
    const favList ={
      name:"musica"
    }
    const res= await server(app).post("/api/favs/").send(favList)
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/something went wrong with token/i)
  });

  it("should get a favlist by Id", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    const favList = {
      name:"musica",
    }
    const userPrev = await server(app).post("/auth/local/signup").send(user);
    const favPrev = await server(app).post("/api/favs/").set('Authorization',`Bearer ${userPrev.body.data.token}`).send(favList);
    const res = await server(app).get(`/api/favs/${favPrev.body.data._id}`).set('Authorization',`Bearer ${userPrev.body.data.token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/Favorites found/i);
  });

  it("should get users list", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    const favList = {
      name:"musica",
    }
    const userPrev = await server(app).post("/auth/local/signup").send(user);
    const favPrev = await server(app).post("/api/favs/").set('Authorization',`Bearer ${userPrev.body.data.token}`).send(favList);
    const res = await server(app).get(`/api/favs/`).set('Authorization',`Bearer ${userPrev.body.data.token}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/Favorites found/i);
  });

  it("should not get users list if empty", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    const userPrev = await server(app).post("/auth/local/signup").send(user);
    const res = await server(app).get(`/api/favs/`).set('Authorization',`Bearer ${userPrev.body.data.token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/favorite List is empty/i);
  });
  it("should create a fav item", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    const favList = {
      name:"musica",
    }
    const favItem = {
      title:"metallica",
      description:"live concert",
      link:"url.com"
    }
    const userPrev = await server(app).post("/auth/local/signup").send(user);
    const favPrev = await server(app).post("/api/favs/").set('Authorization',`Bearer ${userPrev.body.data.token}`).send(favList);
    const res = await server(app).post(`/api/favs/${favPrev.body.data._id}`).set('Authorization',`Bearer ${userPrev.body.data.token}`).send(favItem);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/favorite added/i);
  });
  it("should not create a fav item if invalid user", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    const user1 = {
      email: "jhon1@test.com",
      password: "123456",
    };
    const favList = {
      name:"musica",
    }
    const favItem = {
      title:"metallica",
      description:"live concert",
      link:"url.com"
    }
    const userPrev = await server(app).post("/auth/local/signup").send(user);
    const userPrev1 = await server(app).post("/auth/local/signup").send(user1);
    const favPrev = await server(app).post("/api/favs/").set('Authorization',`Bearer ${userPrev.body.data.token}`).send(favList);
    const res = await server(app).post(`/api/favs/${favPrev.body.data._id}`).set('Authorization',`Bearer ${userPrev1.body.data.token}`).send(favItem);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/invalid user/i);
  });
  
  it("should delete a favorite list", async () => {
    const user = {
      email: "jhon@test.com",
      password: "123456",
    };
    const favList = {
      name:"musica",
    }
    
    const userPrev = await server(app).post("/auth/local/signup").send(user);
    const favPrev = await server(app).post("/api/favs/").set('Authorization',`Bearer ${userPrev.body.data.token}`).send(favList);
    const res = await server(app).delete(`/api/favs/${favPrev.body.data._id}`).set('Authorization',`Bearer ${userPrev.body.data.token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/favorites deleted/i);
  });
});
