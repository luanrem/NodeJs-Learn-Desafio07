import request from "supertest"
import { app } from "../../../../app";
import { Connection } from "typeorm/connection/Connection"

import CreateConnection from "../../../../database"

let connection: Connection
describe("Create User", () => {

  beforeAll(async () => {
    connection = await CreateConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  });

  it("should be able to create a user", async () => {

    const response = await request(app).post("/users").send({
      name: "test",
      email: "koh@de.to",
      password: "369074034"
    })

    expect(response.statusCode).toBe(201)
  })
})
