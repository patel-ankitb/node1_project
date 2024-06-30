const cloudanry = require('cloudinary').v2;
cloudanry.config({
    cloud_name : "dgxnjsxju",
    api_key :"364114964632654",
    api_secret:"2edC19vv72Vk92fwOek4CiqAAYU"
})
const uploadFile =async(file)=>{
    const res = await cloudanry.uploader.upload(file);
    return res
}

module.exports={
    uploadFile
}