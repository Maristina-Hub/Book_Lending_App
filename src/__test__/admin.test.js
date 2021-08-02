import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import userHandler from '../utils/userSamples.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());


// ========>>> A D M I N  R E G I S T R A T I O N
describe("POST /admin/register", () => {
  describe("Evaluations for when request is successful", () => {
    it("when registration succeeds", async () => {
      const response = await request
                              .post('/admin/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fullDetails);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Admin account created successfully");
      expect(response.body.data).toHaveProperty("admin");
    })
  })

  describe("Evaluations for when request fails", () => {
    it("when required fields aren't filled", async () => {
      const response = await request
                              .post('/admin/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.incompleteInfo);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("Failed");
      expect(response.body.message).toBe("Please fill all fields");
    })


    it("when user Email already exists in the Users db", async () => {
      // First register user to Users db
      await request.post('/register')
                   .set('Content-Type', 'application/json')
                   .send(userHandler.fullDetails);

      // Trying to register as admin with same email
      const response = await request
                              .post('/admin/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fullDetails);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("Failed");
      expect(response.body.message).toBe("Oops! User already exists.");
    })


    it("when given passwords don't match", async () => {
      const response = await request
                              .post('/admin/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.diffPasswords);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("Failed");
      expect(response.body.message).toBe("Passwords don't match");
    })
  })
})  