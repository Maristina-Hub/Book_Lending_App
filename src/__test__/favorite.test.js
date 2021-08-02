import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import favoriteMock from '../utils/favoriteMock.js';
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

describe('GET /favorites/', () => {
  it('should get a users list of books on favorite', async () => {

    const { token } = user.body.data;
    const response = await request
                              .get('/favorites/')
                              .set('Authorization', token)
                              ;

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('favorites retrieved');
    expect(response.body).toHaveProperty("data");
  });
})

describe("POST /favorites/", () => {

  it("To add book to favorites", async () => {
    
    const { token } = user.body.data;
    const response = await request
                            .post('/favorites/')
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(favoriteMock.fullDetails);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("book added to favorite");
    expect(response.body.data).toHaveProperty("book");
  })

  it("when book ID wasn't sent", async () => {

    const { token } = user.body.data;
    const response = await request
                            .post('/favorites/')
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(favoriteMock.missingBookId);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("select a book to add");
  })
})


// describe("DELETE /favorites", () => {

//   it("remove book from favorite", async () => {
//     const { token } = user.body.data;
//     const { id } = req.params;
//     const book = await request
//                             .post('/favorites')
//                             .set('Authorization', token)
//                             .set('Content-Type', 'application/json');
                            
   
  
//     const response = await request
//                             .delete('/favorites')
//                             .set('Authorization', token)
//                             .set('Content-Type', 'application/json')
//                             .send({id});
                            
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe("success");
//     expect(response.body.message).toBe("books removed from favorite");
//   })
// })
