import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import userHandler from '../utils/userSamples.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

// ========>>> R E G U L A R   U S E R   R E G I S T R A T I O N
describe("POST /register", () => {
  describe("Evaluations for when request is successful", () => {
    it("when registration succeeds", async () => {
      const response = await request
                              .post('/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fullDetails);

      // expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("successful");
      expect(response.body.data).toHaveProperty("firstname");
    })
  })

  describe("Evaluations for when request fails", () => {
    it("when required fields aren't filled", async () => {
      const response = await request
                              .post('/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.incompleteInfo);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("Please fill all fields");
    })


    it("when given passwords don't match", async () => {
      const response = await request
                              .post('/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.diffPasswords);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("Passwords do not match");
    })


    it("when user Email already exists in the db", async () => {
      // First register user to simulate existing account
      await request.post('/register')
                   .set('Content-Type', 'application/json')
                   .send(userHandler.fullDetails);

      // Trying to register again with same email
      const response = await request
                              .post('/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fullDetails);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("fail");
      expect(response.body.message).toBe("User already exists");
    })
  })
})


// ========>>> L O G I N
describe("POST /login", () => {
  describe("Evaluations for when LOGIN is successful", () => {
    it("when user login succeeds", async () => {
      // Simulating user signup
      await request
              .post('/register')
              .set('Content-Type', 'application/json')
              .send(userHandler.fullDetails);

      // Login attempt on creating account
      const response = await request
                          .post('/login')
                          .set('Content-Type', 'application/json')
                          .send(userHandler.loginDetails);
          

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("Success");
      expect(response.body.message).toBe("Logged in successfully");
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data.token).toMatch("Bearer");
    })
  })

  describe("Evaluations for when LOGIN fails", () => {
    it("when required fields aren't filled", async () => {
      // Simulating user signup
      await request
              .post('/register')
              .set('Content-Type', 'application/json')
              .send(userHandler.fullDetails);

      // Login attempt on creating account
      const response = await request
                              .post('/login')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.incompleteLoginInfo)
      
      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("Failed");
      expect(response.body.message).toBe("Enter your email and password!");
    })


    it("when given email doesn't exist in db", async () => {
      const response = await request
                              .post('/login')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.loginDetails);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe("Failed");
      expect(response.body.message).toBe("Record not found");
    })


    it("when given password doesn't match user's in the db", async () => {
      // First register user to simulate existing account
      await request.post('/register')
                   .set('Content-Type', 'application/json')
                   .send(userHandler.fullDetails);

      // Login attempt with different password
      const loginResponse = await request
                              .post('/login')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fakeLoginPassword);

      expect(loginResponse.statusCode).toBe(404);
      expect(loginResponse.body.status).toBe("Failed");
      expect(loginResponse.body.message).toBe("Email or password incorrect");
    })
  })
})


// ========>>> U S E R   P R O F I L E
describe("GET /user/profile/:id", () => {
  describe("Evaluations for when request is successful", () => {
    it("when request succeeds", async () => {
      // Simulating user signup
      await request
              .post('/register')
              .set('Content-Type', 'application/json')
              .send(userHandler.fullDetails);

      // Login attempt on creating account
      const user = await request
                          .post('/login')
                          .set('Content-Type', 'application/json')
                          .send(userHandler.loginDetails);

      const { _id: user_id, token } = user.body.data;

      const response = await request
                                .get('/user/profile/' + user_id)
                                .set('Authorization', token)
          
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body).toHaveProperty("data");
    })
  })

  describe("Evaluations for when request fails", () => {
    it("when request succeeds", async () => {
      // Simulating user signup
      await request
              .post('/register')
              .set('Content-Type', 'application/json')
              .send(userHandler.fullDetails);

      // Login attempt on creating account
      const user = await request
                          .post('/login')
                          .set('Content-Type', 'application/json')
                          .send(userHandler.loginDetails);

      const { _id: user_id, token } = user.body.data;

      const response = await request
                                .get('/user/profile/' + user_id)
                                .set('Authorization', token)
          
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body).toHaveProperty("data");
    })
  })
})