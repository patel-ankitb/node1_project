const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentmodel = new Schema({
    comment:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId ,
        ref:"user"
   },
   post:{
        type:Schema.Types.ObjectId,
        ref:"post"
   }
},{
    timeseries:true
})

module.exports=mongoose.model("comment",commentmodel)