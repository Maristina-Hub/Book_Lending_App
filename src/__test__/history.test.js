import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import historyMock from '../utils/historyMock.js';
import shelfMock from '../utils/shelfMock.js';
import userHandler from '../utils/userSamples.js';

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

describe('GET /history/users/:userId', () => {
  it('should get a users list of books on history', async () => {

    const { _id: user_id, token } = user.body.data;
    const response = await request
                              .get('/history/users/' + user_id)
                              .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('history retrieved.');
    expect(response.body).toHaveProperty("data");
  });
})

describe("POST /history/users/:userId", () => {

  it("when add book to history", async () => {
    
    const { _id: user_id, token } = user.body.data;
    const response = await request
                            .post('/history/users/' + user_id)
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(historyMock.fullDetails);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("book history created");
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("book");
    expect(response.body.data).toHaveProperty("createdAt");
  })

  it("when book ID wasn't sent", async () => {

    const { _id: user_id, token } = user.body.data;
    const response = await request
                            .post('/history/users/' + user_id)
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(historyMock.missingBookId);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("select a book to add");
  })
})