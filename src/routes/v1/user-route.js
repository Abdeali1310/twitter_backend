const { UserController } = require("../../controllers");
const express = require('express');
const router = express.Router();

//for creating user 
router.post('/signUp',UserController.signUp)

// for signIn
router.post('/signIn',UserController.signIn)


module.exports = router;