const postschema = require('../models/PostModel')
const multer = require('multer')
const path = require('path')
const cloudanryupload = require('../utils/CloudanryUpload')



const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    // fileFilter: function (req, file, cb) {
    //     const fileTypes = /jpeg|jpg|png/
    //     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    //     const mimetype = fileTypes.test(file.mimetype)
    //     if (extname && mimetype) {
    //         return cb(null, true)
    //     }
    //     else {
    //         cb("error : Images only--->")
    //     }
    // }
}).single("imageurl")

const createpost = async(req,res) =>{
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({
                mess: "error uploading file",
                err: err
            })
        } else {
            // cloundinary upload

            const result = await cloudanryupload.uploadFile(req.file.path)
            console.log(result)
           
            try {
                const postobj = {
                   tweet : req.body.tweet,
                   userid :req.body.userid,
                   imagrurl:result,
                   hashtages:req.body.hashtages
                
                }
                const tweet = await postschema.create(postobj);
                res.status(201).json({
                    data: tweet
                })
            } catch (err) {
                res.status(400).json({
                    mess: "failed user....",
                    error: err,
                })
            }
        }
    })

}

const getpostbydata = async(req,res) =>{
    const date =req.query.hashtages;
    console.log(date)
    const getpost = await postschema.find({date:
        {$gtl:date}})
    res.status(401).json({
        mess:"all post data here.........",
        data:getpost
    })
}

// const deletepost = async(req,res) =>{
//     const id = req.params.id;
//     try{
//         const deletepost = await postschema.findByIdAndDelete(id);
//         if(deletepost == null){
//             res.status(404).json({
//                 mess :"user not found ",
//             })
//         }else{
//             res.json({
//                 mess :"post deleted..",
//                 data:deletepost,
//             })
//         }
//     }catch(err){
//         res.status(400).json({
//             mess:"failed.....",
//             error:err,
//         })
//     }
// };

// const updatapost = async(req,res) =>{
//     const id = req.params.id;
//     const updataobj = req.body;
//     try{
//         const updatapost = await postschema.findByIdAndUpdate(id,updataobj,{new:true});
//         console.log(updatapost);
//         if(updatapost == null){
//             res.status(404).json({
//                 mess :" post not found..",
//             })
//         }else{
//             res.json({
//                 mess :"post updated...",
//                 data:updatapost,
//             })
//         }
//     }catch(err){
//         res.status(400).json({
//             mess : " failed ..",
//             error:err,
//         })
//     }
// }


const likepost = async (req, res) => {
    const tweetid = req.params.tweetid;
    const userid = req.body.userid;

    try {
        const tweet = await postschema.findById(tweetid);
        if (tweet != null) {
            if (tweet.likedby.includes(userid)) {
                res.status(400).json({
                    mess: "already like",

                })
            } else {
                const updata = await postschema.findByIdAndUpdate(tweetid,
                    { $inc: { likecount: 1 } },
                    { $push: { likedby: userid } });

                res.status(400).json({
                    mess: "liked...",
                    data: updata,

                })
            }
        } else {
                res.status(400).json({
                    mess:"tweet not found",
            
                })
        }
    }catch(err){
        res.status(400).json({
            mess:"failed..",
            error:err
        })
    }
}

// const test = async(req,res) =>{
//     const data = await userschema.find();
//     if(data){
//         res.status(404).json({
//             mess :"user fetched...",
//             data:data,
//         })
//     }else{
//         res.status(404).json({
//             mess : "user no fetched....",
//         })
//     }
// }
module.exports = {
    createpost,
    // deletepost,
    // updatapost,
    likepost,
    getpostbydata
}

