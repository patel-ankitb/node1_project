const express = require('express');
const router = express.Router();

const usercontroller = require("../controller/UserController")
const authmiddleware = require("../middleware/AuthMiddleware")


router.get("/user",authmiddleware.vaildatauser,usercontroller.getAlluser)
router.post("/user",usercontroller.adduser)

router.post("/login",usercontroller.loginuser)

// router.get("/test",usercontroller.test);



module.exports = router