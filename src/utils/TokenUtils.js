const jwt = require('jsonwebtoken');
const secret = "ankit";

const genratetoken = (payload) =>{
    const token =jwt.sign(payload,secret);
    console.log(token);
    return token;
}

module.exports={
    genratetoken
}