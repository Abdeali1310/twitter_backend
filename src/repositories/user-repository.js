const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const AppError = require("../utils/error/app-error");

class UserRepository {
  async signUp(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Error in creating User", error);
      throw error;
    }
  }

  async getUserByEmail(email){
    try {
        const user = await User.find({email:email});
        return user;
    } catch (error) {
      console.log("Error in Fetching User by email", error);
      throw error;
    }
  }
}

module.exports = UserRepository;
