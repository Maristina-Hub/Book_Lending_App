import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import shelfMock from '../utils/shelfMock.js';
import userHandler from '../utils/userSamples.js';
import { Book } from '../models/bookModel.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

let user = 
beforeEach(async () => {
    // Simulating user signup
    await request
            .post('/register')
            .set('Content-Type', 'application/json')
            .send(userHandler.fullDetails);

    // Login attempt on creating account
    user = await request
                        .post('/login')
                        .set('Content-Type', 'application/json')
                        .send(userHandler.loginDetails);

    return user;
  });

describe('GET /shelf', () => {
  it('should get a users list of books on shelf', async () => {

    const { token } = user.body.data;
    const response = await request
                              .get('/shelf')
                              .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('books retrieved.');
    expect(response.body).toHaveProperty("data"); // teared down = []
  });
})
