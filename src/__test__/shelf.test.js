import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import shelfHandler from '../utils/shelfMock.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

describe('GET /shelf/users/:userId', () => {
  it('should get a users list of books on shelf', async () => {
    const response = await request.get('/shelf/users/60fc96b766f8a42215a4ea80');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('books retrieved.');
    // expect(response.body.data).toHaveProperty("book");
    // expect(response.body.data).toHaveProperty("user");
    // expect(response.body.data).toHaveProperty("createdAt");
  });
})

describe("POST /shelf/users/:userId", () => {
  it("when add book to shelf", async () => {
    const response = await request
                            .post('/shelf/users/60fc96b766f8a42215a4ea80')
                            .set('Content-Type', 'application/json')
                            .send(shelfHandler.fullDetails);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("book was added to shelf");
    expect(response.body.data).toHaveProperty("user");
  })

  it("when book ID wasn't sent", async () => {
    const response = await request
                            .post('/shelf/users/60fc96b766f8a42215a4ea80')
                            .set('Content-Type', 'application/json')
                            .send(shelfHandler.missingBookId);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("Please select a book to add.");
  })
})

describe("DELETE /shelf/users/:userId", () => {
  it("return book", async () => {
    const response = await request
                            .delete('/shelf/users/60fc96b766f8a42215a4ea80')
                            .set('Content-Type', 'application/json')
                            .send(shelfHandler.fullDetails);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("book returned successfully.");
  })
})

