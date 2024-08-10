const { StatusCodes } = require("http-status-codes");
const { Tweet } = require("../models");
const AppError = require("../utils/error/app-error");

class TweetRepository {
  async createTweet(data) {
    try {
      const tweet = await Tweet.create(data);
      return tweet;
    } catch (error) {
      console.log("Error in create", error);
      throw error;
    }
  }

  async getAllTweets() {
    try {
      const tweets = await Tweet.find({});
      return tweets;
    } catch (error) {
      console.log("Cannot able to find", error);
      throw new AppError("Cannot able to find",StatusCodes.NOT_FOUND);
    }
  }

  async getTweet(id) {
    try {
      const tweet = await Tweet.findById(id);
      return tweet;
    } catch (error) {
      console.log("Cannot able to find", error);
      throw new AppError("Cannot able to find",StatusCodes.NOT_FOUND);
    }
  }

  async deleteTweet(id) {
    try {
      const tweet = await Tweet.findByIdAndDelete(id);
      return tweet;
    } catch (error) {
      console.log("Cannot able to delete", error);
      throw new AppError("Cannot able to find",StatusCodes.NOT_FOUND);
    }
  }
}

module.exports=TweetRepository;