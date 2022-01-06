jest.setTimeout(20000);

const app = require('./server');
const mongoose = require("mongoose");
const supertest = require('supertest');
const faker = require("faker");

beforeEach((done) => {
  mongoose.connect("mongodb+srv://root:rootroot@cluster0.r8bms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

test("Get all users", async () => {
  await supertest(app).get("/users")
    .expect(200)
    .then((response) => {
      expect(response.body.success).toBeTruthy();
      expect(Array.isArray(response.body.users)).toBeTruthy();
    });
})

test("Create a user", async () => {
  const user = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }

  await supertest(app)
    .post("/users")
    .send(user)
    .expect(201)
    .then((response) => {
      expect(response.body.success).toBeTruthy();
      expect(response.body.user.email).toEqual(user.email);
      expect(response.body.user.firstName).toEqual(user.firstName);
      expect(response.body.user.lastName).toEqual(user.lastName);
    });
})
