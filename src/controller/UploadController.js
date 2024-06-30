

// const uploadFile = async(req,res) => {
//     upload(req,res,async(err)=>{
//         if(err){
//             res.status(400).json({
//                 mess:"error uploading file",
//                 err:err
//             })
//         }else{
//             // cloundinary upload
//             try{
//                 const result = await cloudanryupload.uploadFile(req.file.path)
//             console.log(result)

//             res.status(400).json({
//                 mess: "file upload successfully !",
//                 file:req.file
//             })
//         }catch(err)
//         {
//             res.status(400).json({
//                 mess:"error",
//                 err:err
//             })
//         }
//         }
//     })
// }
// module.exports={
//     uploadFile
// }


// const path = require('path');
// const multer = require('multer');

// const UserSchema = require("../models/UserModel");

// const passwordUtils = require("../utils/encrypt");
// const TokenUtils = require("../utils/TokenUtils");
// const cloudinaryUtils = require('../utils/CloudinaryUpload');


// const storage = multer.diskStorage({
//     filename: function (req, file, callBackFunction) {
//         callBackFunction(null, file.originalname);
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10000000 },
//     fileFilter: function (file, cb) {
//         const fileTypes = /jpeg|jpg/
//         const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
//         const mimetype = fileTypes.test(file.mimetype)
//         if (extname && mimetype) {
//             return cb(null, true)
//         }
//         else {
//             cb("Error: Images only!")
//         }
//     }
// }).single("myProfilePic");


// const createUser = async (request, response) => {
//     upload(request, response, async (err) => {
//         if (err) {
//             res.status(400).json({
//                 message: "Error uploading file",
//                 err: err
//             })
//         }
//         else {
//             const result = await cloudinaryUtils.uploadFile(req.file.path);

//             const userInsertedObject = request.body;
//             console.log(FIRSTNAME: ${userInsertedObject.firsname});
//             let password = userInsertedObject.password;
//             userInsertedObject.password = passwordUtils.encryptPassword(password);
//             userInsertedObject.profilePic = result.secure_url;

//             console.log(result);

//             const data = await UserSchema.create(userInsertedObject);

//             res.status(200).json({
//                 message: "USER CREATED SUCCESSFULLY!!",
//                 file: req.file
//             })
//         }
//     })
// }

// const loginUser = async (request, response) => {
//     const userInputEmail = request.body.email;
//     const userInputPassword = request.body.password;

//     try {
//         const userByEmail = await UserSchema.findOne({ email: userInputEmail });
//         if (userByEmail) {
//             const isMatch = passwordUtils.comparePassword(userInputPassword, userByEmail.password);
//             if (isMatch) {
//                 let token = TokenUtils.generateToken(userByEmail.toObject());
//                 response.json({
//                     message: USER LOGGED IN SUCCESSFULLY!!,
//                     data: userByEmail,
//                     token: token
//                 }).status(201);
//             } else {
//                 response.json({
//                     message: INVALID PASSWORD!!
//                 });
//             }
//         } else {
//             response.json({
//                 message: USER NOT FOUND WITH GIVEN EMAIL!!,
//             });
//         }
//     } catch (error) {
//         response.json({
//             message: ERROR: ${error},
//         }).status(400);
//     }
// }

// module.exports = {
//     createUser,
// };
