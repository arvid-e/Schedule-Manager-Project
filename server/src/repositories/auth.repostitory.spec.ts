import { beforeEach, describe, it, expect, vi, Mock } from 'vitest';
import mongoose, { Model } from 'mongoose';
import { ICreateUserData, IUserDocument, IUser } from "@app/types/auth.types";
import { AuthRespository } from './auth.repository';

const mockUser: IUser = { 
    _id: '123456789',
    username: 'Guy',
    password: 'hashedPassword',
    createdAt: new Date('2025-07-20'),
    updatedAt: new Date('2025-07-20')
};

let mockUserModel: Model<IUserDocument> & {
    create: Mock;
    findOne: Mock;
};

let authRepository: AuthRespository;

describe('AuthRepository', () => {
    beforeEach(() => {
        // Step 1: AGGRESSIVELY RESTORE ALL MOCKS
        // This attempts to reset all mocks to their original un-mocked state,
        // effectively forcing a clean slate for `vi.fn()` re-creation.
        vi.restoreAllMocks();

        // Step 2: RE-CREATE AND RE-ASSIGN all mock implementations for each test
        // This is the most robust way to ensure mocks behave consistently.
        mockUserModel = {
            create: vi.fn().mockImplementation((data: ICreateUserData) => {
                return {
                    ...data,
                    _id: 'mockId_' + Math.random().toString(36).substring(7),
                    toObject: vi.fn().mockReturnValue(data)
                };
            }),
            findOne: vi.fn().mockImplementation((query) => {
                const mockChainableObject = {
                    select: vi.fn().mockImplementation((fields) => {
               
                        return Promise.resolve(mockUser); // Default return for findUser
                    }),

                };
                return mockChainableObject;
            }),

        } as unknown as Model<IUserDocument> & { create: Mock; findOne: Mock; }; // Type assertion

        // This call *must* now consistently return the mock chainable object
        const testFindOneReturn = mockUserModel.findOne({});

        // Pass the freshly re-created mock to the repository
        authRepository = new AuthRespository(mockUserModel);

    });

    describe('findUser', () => {
        it('should return user', async () => {
            const username = mockUser.username;

            const result = await authRepository.findUser(username);
   
            expect(result).toEqual(mockUser);
            // Now, mockUserModel.findOne will have been called twice:
            // 1. Once in beforeEach for verification (`testFindOneReturn`)
            // 2. Once by authRepository.findUser method.
            expect(mockUserModel.findOne).toHaveBeenCalledTimes(2);
            // The second call (from the method) should have the correct arguments
            expect(mockUserModel.findOne).toHaveBeenCalledWith({ username });

            // Verify the result of the call made by the repository method (the second call)
            const findOneResultFromMethod = mockUserModel.findOne.mock.results[1]?.value;
            expect(findOneResultFromMethod).toBeDefined();
            expect(vi.isMockFunction(findOneResultFromMethod.select)).toBe(true);
            expect(findOneResultFromMethod.select).toHaveBeenCalledTimes(1); // .select called once on the result of the second findOne call
            expect(findOneResultFromMethod.select).toHaveBeenCalledWith('+password');
        });

        it('should return null if user not found', async () => {
            // After re-creation in beforeEach, we can use mockImplementationOnce
            // specifically for the *second* call to findOne (the one from authRepository.findUser).
            (mockUserModel.findOne as Mock).mockImplementationOnce((query) => {
                const queryChain = {
                    select: vi.fn().mockResolvedValue(null) // Resolve to null for not found
                };
            
                return queryChain;
            });

            const username = 'nonexistent';
            const result = await authRepository.findUser(username);

            expect(result).toBeNull();
            expect(mockUserModel.findOne).toHaveBeenCalledTimes(2); // One from beforeEach, one from the method.
            expect(mockUserModel.findOne).toHaveBeenCalledWith({ username });

            const findOneResultFromMethod = mockUserModel.findOne.mock.results[1]?.value;
            expect(findOneResultFromMethod).toBeDefined();
            expect(vi.isMockFunction(findOneResultFromMethod.select)).toBe(true);
            expect(findOneResultFromMethod.select).toHaveBeenCalledTimes(1);
            expect(findOneResultFromMethod.select).toHaveBeenCalledWith('+password');
        });
    });

    describe('createUser', () => {
        it('should create a new user successfully', async () => {
            const createUserData = { username: 'newUser', password: 'newPassword' };
            // mockImplementationOnce will apply to the *first* call to create (from the repository).
            (mockUserModel.create as Mock).mockImplementationOnce((data: ICreateUserData) => {
                return {
                    ...data,
                    _id: 'newUserId',
                    toObject: vi.fn().mockReturnValue({ ...data, _id: 'newUserId' })
                };
            });

            const result = await authRepository.createUser(createUserData);

            expect(result).toEqual({ ...createUserData, _id: 'newUserId' });
            expect(mockUserModel.create).toHaveBeenCalledTimes(1);
            expect(mockUserModel.create).toHaveBeenCalledWith(createUserData);
            const createReturnValue = mockUserModel.create.mock.results[0]?.value;
            expect(createReturnValue.toObject).toHaveBeenCalledTimes(1);
        });

        it('should throw ConflictError if username already exists', async () => {
            const createUserData = { username: 'Guy', password: 'somePassword' };
            const duplicateKeyError = new Error('E11000 duplicate key error');
            (duplicateKeyError as any).code = 11000;
            (duplicateKeyError as any).keyPattern = { username: 1 };
            (mockUserModel.create as Mock).mockRejectedValueOnce(duplicateKeyError);

            await expect(authRepository.createUser(createUserData)).rejects.toThrow('User with this username already exists.');
            expect(mockUserModel.create).toHaveBeenCalledTimes(1);
            expect(mockUserModel.create).toHaveBeenCalledWith(createUserData);
        });

        it('should throw DatabaseError for validation failure', async () => {
            const createUserData = { username: 'tooShort', password: 'bad' };
            const mockValidationError = new mongoose.Error.ValidationError(null as any);
            mockValidationError.message = 'Validation failed: Path `password` (`bad`) is shorter than the minimum allowed length (8).';
            mockValidationError.errors = { password: { message: '...' } as any };
            (mockUserModel.create as Mock).mockRejectedValueOnce(mockValidationError);

            await expect(authRepository.createUser(createUserData)).rejects.toThrow('Validation failed: Validation failed: Path `password` (`bad`) is shorter than the minimum allowed length (8).');
            expect(mockUserModel.create).toHaveBeenCalledTimes(1);
            expect(mockUserModel.create).toHaveBeenCalledWith(createUserData);
        });

        it('should throw generic DatabaseError for other failures', async () => {
            const createUserData = { username: 'someUser', password: 'somePassword' };
            const genericError = new Error('Network issue');
            (mockUserModel.create as Mock).mockRejectedValueOnce(genericError);

            await expect(authRepository.createUser(createUserData)).rejects.toThrow('Failed to create user: Network issue');
            expect(mockUserModel.create).toHaveBeenCalledTimes(1);
            expect(mockUserModel.create).toHaveBeenCalledWith(createUserData);
        });
    });
});