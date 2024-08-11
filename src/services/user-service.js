const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");
const { UserRepository } = require("../repositories");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { ServerConfig } = require("../config");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(data) {
    try {
      const user = await this.userRepository.signUp(data);
      return user;
    } catch (error) {
      throw new AppError(
        "Cannot create a User object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async signIn(data) {
    try {
      //get user by email
      const user = await this.userRepository.getUserByEmail(data.email);
      if (!user) {
        throw new AppError(
          "User with provided email not found",
          StatusCodes.NOT_FOUND
        );
      }
      //comparing password
      const DBPassword = user[0].password;
      const userPassword = data.password;

      if (!DBPassword || !userPassword) {
        throw new AppError(
          "Passwords are not defined",
          StatusCodes.BAD_REQUEST
        );
      }

      const result = bcrypt.compareSync(userPassword, DBPassword);
      if (!result) {
        throw new AppError("Invalid Password", StatusCodes.BAD_REQUEST);
      }
      console.log("User successfully signed In");

      //jwt

      const token = jwt.sign({id:user[0].id,email:user[0].email},ServerConfig.SECRET_KEY,{expiresIn:'2h'});


      return token;
    } catch (error) {
      console.log(error);

      throw new AppError(
        "Cannot able to fetch user at this moment",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = UserService;
