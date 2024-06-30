const userschema = require('../models/UserModels')
const encrypt = require('../utils/encrypt')
const tokenutil = require("../utils/TokenUtils")
const multer = require('multer');
const path = require('path');
const cloudanryupload = require('../utils/CloudanryUpload')


const getAlluser = async (req, res) => {
    const user = await userschema.find();
    res.json({
        mess: " user data fetched..._>",
        data: user
    })
}


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png/
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = fileTypes.test(file.mimetype)
        if (extname && mimetype) {
            return cb(null, true)
        }
        else {
            cb("error : Images only--->")
        }
    }
}).single("profilePic")

const adduser = async (req, res) => {


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
            const hashedpassword = await encrypt.encryptpassword(req.body.password);
            try {
                const userobj = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age,
                    email: req.body.email,
                    profilePic: result.secure_url,
                    password: hashedpassword
                }
                const user = await userschema.create(userobj);
                res.status(201).json({
                    data: user
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

const loginuser = async (req, res) => {
    const useremail = req.body.email;
    const userpassword = req.body.password;

    const userFromemail = await userschema.findOne({ email: useremail });
    if (userFromemail) {
        const isMatch = await encrypt.comparepassword(
            userpassword,
            userFromemail.password
        );
        if (isMatch) {
            const token = tokenutil.genratetoken(userFromemail.toObject());
            res.status(400).json({
                mess: "user login in",
                token: token,
            })
        } else {
            res.status(400).json({
                mess: "invaild password",
            })
        }
    } else {
        res.status(400).json({
            mess: "user not found"
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
    getAlluser,
    adduser,
    loginuser,
    // test
}