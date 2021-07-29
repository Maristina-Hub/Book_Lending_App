import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import historyHandler from '../utils/historyMock.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

describe('GET /history/users/:userId', () => {
  it('should get a users list of books on history', async () => {
    const response = await request.get('/history/users/60fc96b766f8a42215a4ea80');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('history retrieved.');
    // expect(response.body.data).hasOwnProperty("book");
    // expect(response.body.data).toHaveProperty("user");
    // expect(response.body.data).toHaveProperty("createdAt");
  });
})

describe("POST /history/users/:userId", () => {
  // it("when add book to user history", async () => {
  //   const response = await request
  //                           .post('/history/users/60fc96b766f8a42215a4ea80')
  //                           .set('Content-Type', 'application/json')
  //                           .send(historyHandler.fullDetails);
    
  //   expect(response.statusCode).toBe(201);
  //   expect(response.body.status).toBe("success");
  //   expect(response.body.message).toBe("book was added to history");
  //   expect(response.body.data).toHaveProperty("user");
  // })

  it("when book ID wasn't sent", async () => {
    const response = await request
                            .post('/history/users/60fc96b766f8a42215a4ea80')
                            .set('Content-Type', 'application/json')
                            .send(historyHandler.missingBookId);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("select a book to add");
  })
})
