import supertest from 'supertest';
import app from '../server.js';

const request = supertest(app);

it('get route', async () => {
<<<<<<< HEAD
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to our Book-lending app');

=======
  const response = await request.get('/');
  expect(200);
  expect(response.body.message).toBe('Welcome to our Book-lending app.');
<<<<<<< HEAD
>>>>>>> ebb5bd0c65a97781f88090574466b0312ce64920
});
=======
});  
>>>>>>> 84b7702da26d163ef036476b7abef4455226ac79
