import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
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

describe('GET /shelf/users/:userId', () => {
  it('should get a users list of books on shelf', async () => {

    const { _id: user_id, token } = user.body.data;
    const response = await request
                              .get('/shelf/users/' + user_id)
                              .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('books retrieved.');
    expect(response.body).toHaveProperty("data"); // teared down = []
  });
})

describe("POST /shelf/users/:userId", () => {
  it("when add book to shelf", async () => {
    
    const { _id: user_id, token } = user.body.data;
    const response = await request
                            .post('/shelf/users/' + user_id)
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(shelfMock.fullDetails);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("book was added to shelf");
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("book");
    expect(response.body.data).toHaveProperty("createdAt");
  })

  it("when book ID wasn't sent", async () => {
    
    const { _id: user_id, token } = user.body.data;
    const response = await request
                            .post('/shelf/users/' + user_id)
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(shelfMock.missingBookId);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("Please select a book to add.");
  })
})

/*
describe("DELETE /shelf/users/:userId", () => {

    const { _id: user_id, token } = user.body.data;
    const book = await request
                            .post('/shelf/users/' + user_id)
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(shelfMock.fullDetails);
    const { _id: book_id } = book.body.data;
  
    const response = await request
                            .delete('/shelf/users/' + user_id)
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send({book_id});
                            
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("book returned successfully.");
  })
})
*/
