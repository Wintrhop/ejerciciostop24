const req = require("supertest")
const { connect, disconnected, cleanup } = require("./db")
const app = require("./app")

describe("App", () => {

  beforeAll(async () => {
    await connect()
  })

  beforeEach(async () => {
    await cleanup()
  })

  afterAll(async () => {
    await disconnected()
  })

  it("Should connect with mongodb", () => {
    expect("connection with mongo ok").toMatch(/i/)
  })

  
})