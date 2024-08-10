const { LikeController } = require("../../controllers");
const express = require('express');
const router = express.Router();

//for toggling likes
router.post('/toggle',LikeController.toggleLike)


module.exports = router;