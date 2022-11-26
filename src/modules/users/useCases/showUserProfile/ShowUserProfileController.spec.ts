import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";
import { v4 as uuid } from "uuid";

import createConnection from "../../../../database";
import { hash } from "bcryptjs";

const seedEmail = "admin@test.com.br";
let connection: Connection;
describe("Show user profile Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, created_at, updated_at)
    values('${id}', 'admin', '${seedEmail}', '${password}', 'now()', 'now()')
    `
    );
  });

  afterAll(async () => {
    await connection.query(
      `DELETE FROM users
      WHERE email = '${seedEmail}'
    `
    );
    await connection.close();
  });

  it("should be able to show user profile", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@test.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .get("/profile")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(200);
  });
});
