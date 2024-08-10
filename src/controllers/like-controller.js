const { StatusCodes } = require("http-status-codes");
const { LikeService } = require("../services");
const { successResponse, errorResponse } = require("../utils/common");

const likeService = new LikeService();

const toggleLike = async (req,res)=>{
    try {
        const data = req.body;
        const response = await likeService.toggleLike(data.modelId,data.modelType,data.userId);

        successResponse.data = response;
        return res.status(StatusCodes.CREATED).json(successResponse)
    } catch (error) {
        errorResponse.message = error.message
        return res.status(500).json(errorResponse)
    }
}

module.exports = {
    toggleLike,
}