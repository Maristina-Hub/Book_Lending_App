    import supertest from 'supertest';
    import app from '../server.js';
    import * as dbHandler from '../utils/test_db.js';
    import bookCreator from '../utils/bookSample.js';
    import userHandler from '../utils/userSamples.js';

    const request = supertest(app);

    beforeAll(async () => await dbHandler.connect());
    afterEach(async () => await dbHandler.clearDatabase());
    afterAll(async () => await dbHandler.disconnectDB());
    
    
    describe("POST /books", () => {
    describe("Evaluations for when book creation is successful", () => {
        it("when registration succeeds", async () => {

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
