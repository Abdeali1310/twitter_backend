const { TweetController } = require("../../controllers");
const express = require('express');
const router = express.Router();

//for creating route
router.post('/',TweetController.createTweet)

module.exports = router;