  import supertest from 'supertest';

  import app from '../server.js';
  import * as dbHandler from '../utils/test_db.js';
  import userHandler from '../utils/userSamples.js';

  const request = supertest(app);

  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.disconnectDB());

  // ========>>> R E G I S T R A T I O N
  describe("POST /register", () => {
    describe("Evaluations for when request is successful", () => {
      it("when registration succeeds", async () => {
        const response = await request
                                .post('/register')
                                .set('Content-Type', 'application/json')
                                .send(userHandler.fullDetails);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("successful");
        expect(response.body.data).toHaveProperty("firstname");
      })
    })

    describe("Evaluations for when request fails", () => {
      it("when required fields aren't filled", async () => {
        const response = await request
                                .post('/register')
                                .set('Content-Type', 'application/json')
                                .send(userHandler.incompleteInfo);

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("fail");
        expect(response.body.message).toBe("Please fill all fields");
      })


      it("when given passwords don't match", async () => {
        const response = await request
                                .post('/register')
                                .set('Content-Type', 'application/json')
                                .send(userHandler.diffPasswords);

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("fail");
        expect(response.body.message).toBe("Passwords do not match");
      })


      it("when user Email already exists in the db", async () => {
        // First register user to simulate existing account
        await request.post('/register')
                    .set('Content-Type', 'application/json')
                    .send(userHandler.fullDetails);

        // Trying to register again with same email
        const response = await request
                                .post('/register')
                                .set('Content-Type', 'application/json')
                                .send(userHandler.fullDetails);

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("fail");
        expect(response.body.message).toBe("User already exists");
      })
    })
  })


  // ========>>> L O G I N
  describe("POST /login", () => {
    describe("Evaluations for when LOGIN is successful", () => {
      it("when user login succeeds", async () => {
        // Simulating user signup
        await request
                .post('/register')
                .set('Content-Type', 'application/json')
                .send(userHandler.fullDetails);

        // Login attempt on creating account
        const response = await request
                                .post('/login')
                                .set('Content-Type', 'application/json')
                                .send(userHandler.loginDetails)
            

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("successful");
        expect(response.body.data).toHaveProperty("token");
        expect(response.body.data.token).toMatch("Bearer");
      })
    })

    describe("Evaluations for when LOGIN fails", () => {
      it("when required fields aren't filled", async () => {
        // Simulating user signup
        await request
                .post('/register')
                .set('Content-Type', 'application/json')
                .send(userHandler.fullDetails);

        // Login attempt on creating account
        const response = await request
                                .post('/login')
                                .set('Content-Type', 'application/json')
                                .send(userHandler.incompleteLoginInfo)
        
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe("fail");
        expect(response.body.message).toBe("Provide email and password");
      })


      it("when given email doesn't exist in db", async () => {
        const response = await request
                                .post('/login')
                                .set('Content-Type', 'application/json')
                                .send(userHandler.loginDetails);

        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe("fail");
        expect(response.body.message).toBe("record not found");
      })


      it("when given password doesn't match user's in the db", async () => {
        // First register user to simulate existing account
        await request.post('/register')
                    .set('Content-Type', 'application/json')
                    .send(userHandler.fullDetails);

        // Login attempt with different password
        const loginResponse = await request
                                .post('/login')
                                .set('Content-Type', 'application/json')
                                .send(userHandler.fakeLoginPassword);

        expect(loginResponse.statusCode).toBe(400);
        expect(loginResponse.body.status).toBe("fail");
        expect(loginResponse.body.message).toBe("email or password is incorrect");
      })
    })
  })