import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import historyHandler from '../utils/historyMock.js';
import userHandler from '../utils/userSamples.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

describe('GET /history/users/:userId', () => {
  it('should get a users list of books on history', async () => {
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
                              .get('/history/users/' + user_id)
                              .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('history retrieved.');
    // expect(response.body.data).toHaveProperty("book");
  });
})

describe("POST /history/users/:userId", () => {
  // it("when add book to user history", async () => {
  //   // Simulating user signup
  //   await request
  //           .post('/register')
  //           .set('Content-Type', 'application/json')
  //           .send(userHandler.fullDetails);

  //   // Login attempt on creating account
  //   const user = await request
  //                       .post('/login')
  //                       .set('Content-Type', 'application/json')
  //                       .send(userHandler.loginDetails);

  //   const { _id: user_id, token } = user.body.data;

  //   const response = await request
  //                           .post('/history/users/' + user_id)
  //                           .set('Authorization', token)
  //                           .set('Content-Type', 'application/json')
  //                           .send(historyHandler.fullDetails);
    
  //   expect(response.statusCode).toBe(201);
  //   expect(response.body.status).toBe("success");
  //   expect(response.body.message).toBe("book history created");
  //   expect(response.body.data).toHaveProperty("user");
  // })

  it("when book ID wasn't sent", async () => {
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
                            .post('/history/users/' + user_id)
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(historyHandler.missingBookId);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("select a book to add");
  })
})
