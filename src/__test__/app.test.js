import supertest from 'supertest';
import app from '../server.js';
import userMock from '../utils/usersTestMocks.js';

const request = supertest(app);

describe('GET /', () => {
  it('should get the home route, with status 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to our Book-lending app.');
  });
})
/*
describe('POST /register', () => {
  it("should return status 400 when incomplete details are supplied", () => {
    request
      .post('/register')
      .type('Content-Type', 'application/json')
      .send(userMock.missingDetails)
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Please fill all fields');
      });
  })

  it("should return status 400 when passswords don't match", () => {
    request
      .post('/register')
      .type('Content-Type', 'application/json')
      .send(userMock.diffPasswords)
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Passwords do not match');
      });
  })

  it("should return registered user's details in json on successful registration", () => {
    request
      .post('/register')
      .set('Content-Type', 'application/json')
      .send(userMock.fullDetails)
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
      });
  });
});
*/