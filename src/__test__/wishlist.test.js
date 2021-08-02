import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import wishlistMock from '../utils/wishlistMock.js';
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

describe('GET /wishlists/', () => {
  it('should get a users list of books on wishlist', async () => {

    const { token } = user.body.data;
    const response = await request
                              .get('/wishlists/')
                              .set('Authorization', token)
                              ;

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('wishlists retrieved');
    expect(response.body).toHaveProperty("data");
  });
})

describe("POST /wishlists/addbook", () => {

  it("when add book to wishlist", async () => {
    
    const { token } = user.body.data;
    const response = await request
                            .post('/wishlists/addbook')
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(wishlistMock.fullDetails);
   
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("book added to wishlist");
    expect(response.body.data).toHaveProperty("book");
  })


  it("when book ID wasn't sent", async () => {

    const { token } = user.body.data;
    const response = await request
                            .post('/wishlists/addbook')
                            .set('Authorization', token)
                            .set('Content-Type', 'application/json')
                            .send(wishlistMock.missingBookId);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("select a book to add");
  })
})


// describe("DELETE /wishlists/users/:userId", () => {

//   it("when remove book from wishlist", async () => {
//     const { token } = user.body.data;
//     const book = await request
//                             .post('/wishlists/')
//                             .set('Authorization', token)
//                             .set('Content-Type', 'application/json')
//                             .send(bookMock.fullDetails);
//     const { _id: book_id } = book.body.data;
  
//     const response = await request
//                             .delete('/wishlists/')
//                             .set('Authorization', token)
//                             .set('Content-Type', 'application/json')
//                             .send({book_id});
                            
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe("success");
//     expect(response.body.message).toBe("book removed from wishlist");
//   })
// })
