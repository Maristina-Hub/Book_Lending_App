import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import userHandler from '../utils/userSamples.js';
import { User } from '../models/userModel.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

describe("POST /register", () => {
  describe("Evaluations for when request is successful", () => {
    it("when registration succeeds", async () => {
      const response = await request
                              .post('/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fullDetails);

      expect(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("successful");
      expect(response.body.data).toHaveProperty("firstname");
    })
  })

  // describe("Evaluations for when request fails", () => {
  //   it("")
  // })
})