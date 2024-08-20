const { UserRepository } = require("../../src/repositories");
const { UserService } = require("../../src/services");

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

        const userRepositoryInstance = new UserRepository();
        userRepositoryInstance.signUp.mockResolvedValue(mockReturnValue);

        const service = new UserService();
        service.userRepository = userRepositoryInstance; // Inject the mocked repository

        const response = await service.signUp(data);

        expect(response.email).toBe(data.email);
        expect(response.createdAt).toBe(mockReturnValue.createdAt);
    });
});
