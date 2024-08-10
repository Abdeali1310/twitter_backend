const mongoose = require('mongoose');

const commentSchema =new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    comment:{
        type:String,
    },
    onModel:{
        type:String,
        required:true,
        enum:["Tweet","Like"],
    },
    commentAble:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:"onModel",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment