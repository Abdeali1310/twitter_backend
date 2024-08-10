const { StatusCodes } = require("http-status-codes");
const { Hashtag } = require("../models");
const AppError = require("../utils/error/app-error");

class HashtagRepository {
  async createHashtag(data) {
    try {
      const tag = await Hashtag.create(data);
      return tag;
    } catch (error) {
      console.log("Error in create", error);
      throw error;
    }
  }

  //bulk create
  async bulkCreate(data) {
    try {
      const tags = await Hashtag.insertMany(data);
      return tags;
    } catch (error) {
      console.log("Error in create", error);
      throw error;
    }
  }

  async getAllHashtags() {
    try {
      const Hashtags = await Hashtag.find({});
      return Hashtags;
    } catch (error) {
      console.log("Cannot able to find", error);
      throw new AppError("Cannot able to find",StatusCodes.NOT_FOUND);
    }
  }

  //get by name
  async getHashtagByName(text) {
    try {
      const hashtag = await Hashtag.find({
        text:text,
      });
      return hashtag;
    } catch (error) {
      console.log("Cannot able to find", error);
      throw new AppError("Cannot able to find",StatusCodes.NOT_FOUND);
    }
  }

  async getHashtag(id) {
    try {
      const hashtag = await Hashtag.findById(id);
      return hashtag;
    } catch (error) {
      console.log("Cannot able to find", error);
      throw new AppError("Cannot able to find",StatusCodes.NOT_FOUND);
    }
  }

  async deleteTweet(id) {
    try {
      const hashtag = await Hashtag.findByIdAndDelete(id);
      return hashtag;
    } catch (error) {
      console.log("Cannot able to delete", error);
      throw new AppError("Cannot able to find",StatusCodes.NOT_FOUND);
    }
  }
}

module.exports=HashtagRepository;