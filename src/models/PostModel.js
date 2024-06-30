const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const postmodel =  new Schema ({
    tweet :{
        type:String,
    },
    userid:{
        type: Schema.Types.ObjectId,
        ref:"user"
    },
    imageurl:{
        type:String,
    },
    likecount:{
        type:Number,
        default :0,
    },
    likedby:[{
        type:Schema.Types.ObjectId,
        ref:"user"
    }],
    hashtages:[{
        type:String,
    }],
    date:{
        type:String,
        formatdate:"RRRR-MM-DD"
    }
},{
    timestamps:true
})
module.exports = mongoose.model("post",postmodel)