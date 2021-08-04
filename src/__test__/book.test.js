    import supertest from 'supertest';
    import app from '../server.js';
    import * as dbHandler from '../utils/test_db.js';
    import bookCreator from '../utils/bookSample.js';
    import userHandler from '../utils/userSamples.js';
    import Book from '../models/bookModel.js'

    const request = supertest(app);

    beforeAll(async () => await dbHandler.connect());
    afterEach(async () => await dbHandler.clearDatabase());
    afterAll(async () => await dbHandler.disconnectDB());
    
    
    describe("POST /books", () => {
    describe("Evaluations for when book creation is successful", () => {
        it("when book creation is successful", async () => {

            // Simulating user signup for admin
                await request
                        .post('/admin/register')
                        .set('Content-Type', 'application/json')
                        .send(userHandler.fullDetails);
               // Simulating user login for admin         
            const user =  await request
                        .post('/login')
                        .set('Content-Type', 'application/json')
                        .send(userHandler.loginDetails);
                        
            const { _id: user_id, token } = user.body.data;
            
            //book creation attempt
            const response = await request
                                .post('/books')
                                .set('Content-Type', 'application/json')
                                .set('Authorization', token)
                                .send(bookCreator.admin)
            
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.message).toBe("successful");
            expect(response.body.data).toHaveProperty("title");
        })
    })
})

//   WHEN A FILED IS NOT FILLED
describe("POST /books", () => {
    describe("Evaluations for when book creation is successful", () => {
        it("when book creation is successful", async () => {

            // Simulating user signup for admin
                await request
                        .post('/admin/register')
                        .set('Content-Type', 'application/json')
                        .send(userHandler.fullDetails);
               // Simulating user login for admin         
            const user =  await request
                        .post('/login')
                        .set('Content-Type', 'application/json')
                        .send(userHandler.loginDetails);
                        
            const { _id: user_id, token } = user.body.data;
            
            //book creation attempt
            const response = await request
                                .post('/books')
                                .set('Content-Type', 'application/json')
                                .set('Authorization', token)
                                .send(bookCreator.incompleteDetails)
            
            expect(response.statusCode).toBe(400);
            expect(response.body.status).toBe("fail");
            expect(response.body.message).toBe("Please fill all fields");
        })
    })
})

    //      GET BOOKS
describe("GET /books", () => {
    describe("Evaluations to get all books", () => {
        it("when request succeeds", async () => {

        const response = await request
                                    .get('/books/')
                                    .set('Content-Type', 'application/json')
            
        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("successful");
        })
    })
})

describe("GET /books/:id", () => {
    describe("Evaluations to get book by id", () => {
        it("when request succeeds", async () => {

        const id = bookCreator.getBookById._id
        const response = await request
                                    .get('/books/' + id )
                                    .set('Content-Type', 'application/json')
                                    
            
        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("successful");
        })
    })
})

describe("GET /books/:id", () => {
    describe("Evaluations to get book by id", () => {
        it("when request fails", async () => {

        const id = bookCreator.wrongID._id
        const response = await request
                                    .get('/books/' + id )
                                    .set('Content-Type', 'application/json')
                                    
            
        expect(response.statusCode).toBe(500);
        expect(response.body.status).toBe("fail");
        expect(response.body.message).toBe("server err");
        })
    })
})

