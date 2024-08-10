const { TweetService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");

const tweetService = new TweetService();

const createTweet = async (req,res)=>{
    try {
        const data = req.body;
        const response = await tweetService.create(data);

        successResponse.data = response;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

module.exports = {createTweet}