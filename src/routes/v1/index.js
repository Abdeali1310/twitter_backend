const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();
const TweetRoutes = require('./tweet-route');
const UserRoutes = require('./user-route');
const LikeRoutes = require('./like-route')

router.get('/info', InfoController.info);

router.use('/tweets',TweetRoutes);
router.use('/user',UserRoutes);
router.use('/likes',LikeRoutes)

module.exports = router;