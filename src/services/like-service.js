const { LikeRepository, TweetRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");

class LikeService{
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }
    
    async toggleLike(modelId,modelType,userId){
        let likeable;
        if(modelType == 'Tweet'){
            likeable = await this.tweetRepository.getTweet(modelId);
        }
        else if(modelType == 'Comment'){
            likeable = await this.commentRepository.getComment(modelId);
        }
        else{
            throw new AppError("Invalid modelType");
        }
        const exists = await this.likeRepository.findByUserAndLikeable({
            user:userId,
            onModel:modelType,
            likeable:modelId,
        })
        console.log("already present ",exists);
        let isAdded;
        if(exists){
            likeable.likes.pull(exists.id);
            await likeable.save();
            await this.likeRepository.deleteOne({ _id: exists._id });
            isAdded = false;
        }
        else{
            const newLike = await this.likeRepository.create({
                user:userId,
                onModel:modelType,
                likeable:modelId,
            })
            likeable.likes.push(newLike)
            await likeable.save();
            isAdded = true;
        }
        return {isAdded}
    }
}

module.exports = LikeService;