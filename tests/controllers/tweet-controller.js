const { getTweet } = require("../../src/controllers/tweet-controller");
const { tweetService } = require("../../src/services");
const { mockResponse, mockRequest } = require("./mocker");

jest.mock('../../src/services/tweet-service.js');

test('should return tweets', async () => {
    const req = mockRequest({ params: { id: '1' } }); // Adjust id as needed
    const res = mockResponse();

    const response = [
        {
            content: 'Tweet 1',
        },
        {
            content: 'Tweet 2'
        },
    ];
    tweetService.getTweet.mockReturnValue(response);

    const successResponse = {
        success: true,
        message: 'Successfully fetched a tweet from service',
        data: response,
    };

    await getTweet(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith(successResponse);
});
