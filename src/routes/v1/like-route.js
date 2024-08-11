const { LikeController } = require("../../controllers");
const express = require('express');
const { authenticate } = require("../../middlewares/authenticate");
const router = express.Router();

//for toggling likes
router.post('/toggle',authenticate,LikeController.toggleLike)


module.exports = router;