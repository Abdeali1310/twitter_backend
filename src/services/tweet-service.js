const { StatusCodes } = require("http-status-codes");
const { TweetRepository, HashtagRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    try {
      const content = data.content;
      const tags = content
        .match(/#+[a-zA-Z0-9(_)]+/g)
        .map((tag) => tag.substring(1).toLowerCase());
      //storing the tweet

      const tweet = await this.tweetRepository.createTweet(data);

      //storing the hashtags
      let alreadyPresentTags = await this.hashtagRepository.getHashtagByName(
        tags
      );
      let textOfPresentTags = alreadyPresentTags.map((tags) => tags.text);
      let newTags = tags.filter((tag) => !textOfPresentTags.includes(tag));
      newTags = newTags.map((tag) => {
        return {
          text: tag,
          tweets: [tweet.id],
        };
      });

      await this.hashtagRepository.bulkCreate(newTags);
      alreadyPresentTags.forEach((tag) => {
        tag.tweets.push(tweet.id);
        tag.save();
      });
    } catch (error) {
      throw new AppError(
        "Cannot create a Tweet object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getTweet(tweetId) {
    try {
      const tweet = await this.tweetRepository.getTweet(tweetId);
      return tweet;
    } catch (error) {
      throw new AppError(
        "Cannot able to fetch data at the moment",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = TweetService;
