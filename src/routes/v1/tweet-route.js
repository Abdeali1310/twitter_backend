const { TweetController } = require("../../controllers");
const express = require('express');
const router = express.Router();

//for creating route
router.post('/',TweetController.createTweet)

router.get('/:id',TweetController.getTweet)

module.exports = router;