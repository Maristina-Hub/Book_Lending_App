import supertest from 'supertest';
import app from '../server.js';
// import shelfMock from '../utils/shelvesTestMocks.js';

const request = supertest(app);

describe('GET /', () => {
  it('should get the home route, with status 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to our Book-lending app.');
  });
})

// describe('GET /users/:userId', () => {
//   it('should get a users list of books on shelf', async () => {
//     const response = await request.get('/users/:userId');
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('list of books.');
//   });
// })
