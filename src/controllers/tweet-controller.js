const { StatusCodes } = require("http-status-codes");
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

const getTweet = async (req,res)=>{
    try {
        const id = req.params.id;
        const response = await tweetService.getTweet(id);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

module.exports = {createTweet,getTweet}