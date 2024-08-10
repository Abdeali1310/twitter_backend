const { StatusCodes } = require("http-status-codes");
const { Like } = require("../models");
const AppError = require("../utils/error/app-error");

class LikeRepository {
  async findByUserAndLikeable(data) {
    try {
      const like = await Like.findOne(data);
      return like;
    } catch (error) {
      console.log("Error in finding like object", error);
      throw error;
    }
  }

  async create(data) {
    try {
      const like = await Like.create(data);
      return like;
    } catch (error) {
      console.log("Error in creating like object", error);
      throw error;
    }
  }

  async deleteOne(likeId) {
    return await Like.deleteOne({ _id: likeId });
  }
}

module.exports = LikeRepository;
