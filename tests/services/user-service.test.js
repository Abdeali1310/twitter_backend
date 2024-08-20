const { UserRepository } = require("../../src/repositories");
const { UserService } = require("../../src/services");

// Mock the UserRepository module
jest.mock("../../src/repositories", () => ({
    UserRepository: jest.fn().mockImplementation(() => ({
        signUp: jest.fn()
    }))
}));

describe('User Service Tests', () => {
    test('should successfully create a user', async () => {
        const data = {
            email: 'abc@gmail.com',
            password: 'abc'
        };

        const mockReturnValue = { ...data, createdAt: '2024-09-09', updatedAt: '2024-06-05' };

        // Create an instance of UserRepository and mock the signUp method
        const userRepositoryInstance = new UserRepository();
        userRepositoryInstance.signUp.mockResolvedValue(mockReturnValue);

        // Create an instance of UserService with the mocked UserRepository
        const service = new UserService();
        service.userRepository = userRepositoryInstance; // Inject the mocked repository

        // Call signUp method with the data
        const response = await service.signUp(data);

        // Assertions
        expect(response.email).toBe(data.email);
        expect(response.createdAt).toBe(mockReturnValue.createdAt);
    });
});
