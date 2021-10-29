"use strict";

const { db } = require("../src/modelinstance/index.js");
const supertest = require("supertest");
const server = require("../src/server.js");
const { expect } = require("@jest/globals");
const request = supertest(server.server);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});
let token = null;

describe("Testing authentication routes", () => {
  it("Should be able to add an item to the DB and returns an object with the added item using POST /api/:mode", async () => {
    const responseUser = await request.post("/signup").send({
      username: "user",
      password: "password",
      role: "teacher",
    });
    const userObject = responseUser.body.user;
    token = userObject.token;

    const response = await request
      .post("/api/bulletin")
      .set("Authorization", `Bearer ${token}`)
      .send({
        subject: "Lab 01",
        body: "create a really cool lab",
        dueDate: "10/1/20",
      });
    expect(response.status).toEqual(201);
    expect(response.body.subject).toEqual("Lab 01");
    expect(response.body.body).toEqual("create a really cool lab");
    expect(response.body.dueDate).toEqual("10/1/20");
  });

  it("Should be able to returns a list of :model items using GET /api/:model", async () => {
    const response = await request
      .get("/api/bulletin")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
  it("Should be able to returns single item by ID using GET /api/:model/ID", async () => {
    const response = await request
      .get("/api/bulletin/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.subject).toEqual("Lab 01");
  });

  it("Should be able to update single item by ID using PUT /api/:model/ID", async () => {
    const response = await request
      .put("/api/bulletin/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        subject: "Lab 02",
        body: "different lab",
        dueDate: "10/1/21",
      });
    expect(response.status).toEqual(200);
    expect(response.body.subject).toEqual("Lab 02");
    expect(response.body.body).toEqual("different lab");
    expect(response.body.dueDate).toEqual("10/1/21");
  });

  it("Should be able to delete single item by ID using DELETE /api/:model/ID and test with GET to get null in response", async () => {
    const responseDel = await request
      .delete("/api/bulletin/1")
      .set("Authorization", `Bearer ${token}`);
    expect(responseDel.body).toBe(1);

    const response = await request
      .get("/api/bulletin/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body === null).toBe(true);
  });
});
