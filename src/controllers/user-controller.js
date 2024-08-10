const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");

const userService = new UserService();

const signUp = async (req,res)=>{
    try {
        const data = req.body;
        const response = await userService.signUp(data);

        successResponse.data = response;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

const signIn = async (req,res)=>{
    try {
        const data = req.body;
        const response = await userService.signIn(data);
        
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(error.statusCode).json(errorResponse)
    }
}

module.exports = {signUp,signIn}