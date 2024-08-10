const mongoose = require('mongoose');

const hashSchema =new mongoose.Schema({
    text:{
        type:String,
    },
    
    tweets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tweet',
        },
    ]
});

const Hashtag = mongoose.model('Hashtag',hashSchema);
module.exports = Hashtag