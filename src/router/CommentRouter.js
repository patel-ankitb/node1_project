const express = require('express');
const router = express.Router();

const commentcontroller = require('../controller/CommentController');


router.post('/comment',commentcontroller.addcomment)

router.get('/comment',commentcontroller.getallcomment)


module.exports = router;