const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();
const TweetRoutes = require('./tweet-route')
router.get('/info', InfoController.info);

router.use('/tweets',TweetRoutes);
module.exports = router;