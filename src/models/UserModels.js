const mongoose  = require('mongoose');

const Schema = mongoose.Schema;
const userschema = new Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
    },
    status:{
        type:Boolean,
        default:false
    },
    profilePic: {
        type: String,
    },
  
    password:{
        type:String
    }
    
},{
    timeseries :true,
})


module.exports = mongoose.model("user",userschema)