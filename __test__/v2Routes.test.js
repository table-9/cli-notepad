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
  it("Should be able to add an item to the DB and returns an object with the added item using POST /api/v2/:mode", async () => {
    const responseUser = await request.post("/signup").send({
      username: "user",
      password: "password",
      role: "admin",
    });
    const userObject = responseUser.body.user;
    token = userObject.token;

    const response = await request
      .post("/api/v2/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "this is a notes line",
        creator: "anthony",
      });
    expect(response.status).toEqual(201);
    expect(response.body.text).toEqual("this is a notes line");
    expect(response.body.creator).toEqual("anthony");
  });

  it("Should be able to returns a list of :model items using GET /api/v2/:model", async () => {
    const response = await request
      .get("/api/v2/notes")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
  it("Should be able to returns single item by ID using GET /api/v2/:model/ID", async () => {
    const response = await request
      .get("/api/v2/notes/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.text).toEqual("this is a notes line");
    // expect(response.body.date).toEqual();
  });

  it("Should be able to update single item by ID using PUT /api/v2/:model/ID", async () => {
    const response = await request
      .put("/api/v2/notes/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "this is an updated line of notes",
        creator: "dario",
      });
    expect(response.status).toEqual(200);
    expect(response.body.text).toEqual("this is an updated line of notes");
    expect(response.body.creator).toEqual("dario");
  });

  it("Should be able to delete single item by ID using DELETE /api/v2/:model/ID and test with GET to get null in response", async () => {
    const responseDel = await request
      .delete("/api/v2/notes/1")
      .set("Authorization", `Bearer ${token}`);
    expect(responseDel.body).toBe(1);

    const response = await request
      .get("/api/v2/notes/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body === null).toBe(true);
  });
});
