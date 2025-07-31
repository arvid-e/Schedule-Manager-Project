import request from 'supertest'; 
import { app } from '@app/app';
import { connectTestDB, disconnectTestDB, clearTestDB, seedTestDB } from '../utils/db-setup'; 
import User from '@app/models/user.model'; // Import models to check DB state directly (optional but good)
import { ILoginData, IRegisterData } from '@app/types/auth.types';
import EventModel from '@app/models/event.model';

vi.mock('@app/config/constants', () => ({
    BCRYPT_SALT_ROUNDS: 10, // Provide a mock value
    JWT_SECRET: 'mock_jwt_secret_for_integration_tests', // Provide a mock value
    JWT_EXPIRES_IN: '1h', // Provide a mock value
}));

describe('Auth API Integration Tests', () => {
    // Supertest agent for making requests
    let api: request.SuperTest<request.Test>;

    // Before all tests in this suite, connect to the test database and initialize supertest
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        process.env.JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkeyforintegrationtests';
        process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
        process.env.BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || '10';

        await connectTestDB(); // Connect to the test database
        api = request(app) as unknown as request.SuperTest<request.Test>;
    });

    // Before each test, clear and re-seed the database to ensure a clean state
    beforeEach(async () => {
        await clearTestDB();
        await seedTestDB(); // Seed with a known user for login tests
    });

    // After all tests in this suite, disconnect from the database
    afterAll(async () => {
        await disconnectTestDB();
    });

    // --- Test Cases ---

    describe('POST /auth/register', () => {
        it('should register a new user and return a token (201)', async () => {
            const registerData: IRegisterData = {
                username: 'newuser',
                password: 'newsecurepassword123',
            };

            const res = await api.post('/auth/register').send(registerData);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body).toHaveProperty('token');
            expect(typeof res.body.token).toBe('string');

            // Optional: Verify user was actually saved in the database
            const userInDb = await User.findById(res.body.user.id);
            expect(userInDb).toBeDefined();
            expect(userInDb?.username).toBe(registerData.username);
            // Don't assert on password directly due to hashing, but ensure it's not plain
            expect(userInDb?.password).not.toBe(registerData.password);
        });

        it('should return 409 Conflict if username already exists', async () => {
            // The `seededuser` from beforeEach already exists
            const registerData: IRegisterData = {
                username: 'seededuser', // This user already exists
                password: 'anypassword',
            };

            const res = await api.post('/auth/register').send(registerData);

            expect(res.statusCode).toBe(409); // Conflict status code
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toContain('Username is already taken'); // Or whatever your error message is
        });

        it('should return 400 Bad Request for invalid registration data (e.g., missing password)', async () => {
            const registerData = {
                username: 'invaliduser',
                // password is missing
            };

            const res = await api.post('/auth/register').send(registerData);

            expect(res.statusCode).toBe(400); // Bad Request status code
            expect(res.body).toHaveProperty('message');
            // Expect a message related to validation failure
            expect(res.body.message).toContain('Password is required');
        });
    });

    describe('POST /api/auth/login', () => {
        const seededUserLogin: ILoginData = {
            username: 'seededuser',
            password: 'testpassword123', // Matches what's seeded in db-setup
        };

        it('should log in an existing user and return a token (200)', async () => {
            const res = await api.post('/auth/login').send(seededUserLogin);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body).toHaveProperty('token');
            expect(typeof res.body.token).toBe('string');
        });

        it('should return 401 Unauthorized for incorrect password', async () => {
            const invalidLogin: ILoginData = {
                username: 'seededuser',
                password: 'wrongpassword',
            };

            const res = await api.post('/auth/login').send(invalidLogin);

            expect(res.statusCode).toBe(401); // Unauthorized status code
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toContain('Incorrect password!'); // Or your specific error message
        });

        it('should return 401 Unauthorized for non-existent username', async () => {
            const nonExistentLogin: ILoginData = {
                username: 'nonexistentuser',
                password: 'anypassword',
            };

            const res = await api.post('/auth/login').send(nonExistentLogin);

            expect(res.statusCode).toBe(401); // Unauthorized status code
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toContain('Cant find user!'); // Or your specific error message
        });
    });

    // --- Example: Protected Route Test (requires a token) ---
    describe('GET /events (Protected)', () => {
        let authToken: string;

        // Before this describe block, log in a user to get a token
        beforeEach(async () => {
            // Re-seed DB first to ensure seededuser exists for login
            await clearTestDB();
            await seedTestDB();

            const loginRes = await api.post('/auth/login').send({
                username: 'seededuser',
                password: 'testpassword123',
            });
            authToken = loginRes.body.token;
            expect(authToken).toBeDefined(); // Ensure we got a token
        });

        it('should return events for an authenticated user (200)', async () => {
            // Optional: Seed some events here if you want to test retrieval
            await EventModel.create({
                title: 'Test Event 1',
                description: 'Description 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            await EventModel.create({
                title: 'Test Event 2',
                description: 'Description 2',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const res = await api.get('/events').set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBeGreaterThanOrEqual(2); // Expect at least the seeded events
            expect(res.body[0]).toHaveProperty('title');
        });

        it('should return 401 Unauthorized if no token is provided', async () => {
            const res = await api.get('/events'); // No Authorization header

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('message');
        });

        it('should return 401 Unauthorized if an invalid token is provided', async () => {
            const res = await api.get('/events').set('Authorization', 'Bearer invalid.jwt.token');

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('message');
        });
    });
});