const bcrypt = require('bcrypt');
const encryptpassword = async(password)=>{
    try{
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    return hashedpassword;
    }catch(err){
        console.log(err);
    }
}
const comparepassword = async(password,hashedpassword) =>{
    const isMatch = await bcrypt.compare(password,hashedpassword);
    return isMatch;
}
module.exports ={
    encryptpassword,
    comparepassword
}