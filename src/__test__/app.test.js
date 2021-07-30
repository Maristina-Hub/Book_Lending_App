import supertest from 'supertest';
import app from '../server.js';

const request = supertest(app);

it('get route', async () => {
<<<<<<< HEAD
<<<<<<< HEAD
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to our Book-lending app');

=======
=======

>>>>>>> 83a7df8b2421881214f913f7be67bca06caf3efd
  const response = await request.get('/');
<<<<<<< HEAD
  expect(response.status).toBe(200);
<<<<<<< HEAD
  expect(response.body.message).toBe('Welcome to our book lending app');
=======
=======
  expect(200);
>>>>>>> ebb5bd0c65a97781f88090574466b0312ce64920
  expect(response.body.message).toBe('Welcome to our Book-lending app.');
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ebb5bd0c65a97781f88090574466b0312ce64920
});
=======
});  
>>>>>>> 84b7702da26d163ef036476b7abef4455226ac79
=======
>>>>>>> 9b982f9a07678ccff33500e862d1dd64def95c62
=======

>>>>>>> 8ee82847aef086ff153134d09622e2c6404b1e4c
});
>>>>>>> 83a7df8b2421881214f913f7be67bca06caf3efd
