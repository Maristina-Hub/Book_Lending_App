import supertest from 'supertest';
import app from '../server.js';

const request = supertest(app);

it('get route', async () => {
  const response = await request.get('/');
  expect(response.status).toBe(200);
<<<<<<< HEAD
  expect(response.body.message).toBe('Welcome to our book lending app');
=======
  expect(response.body.message).toBe('Welcome to our Book-lending app.');
>>>>>>> 9b982f9a07678ccff33500e862d1dd64def95c62
});