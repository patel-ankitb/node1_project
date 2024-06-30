const express = require('express');
const router = express.Router();

const postcontroller = require('../controller/PostController')

router.post('/post',postcontroller.createpost)
// router.delete('/post/:userid',postcontroller.deletepost)
// router.put('/post/:userid',postcontroller.updatapost)

router.put('/like/:tweetid',postcontroller.likepost)

router.get('/date',postcontroller.getpostbydata)

module.exports = router;