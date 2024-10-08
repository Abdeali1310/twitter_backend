const { StatusCodes } = require("http-status-codes");
const passport = require("passport");
const authenticate = (req,res,next)=>{
    passport.authenticate('jwt',(err,user)=>{
        if(err){
            next(err);
        }
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized access'});
        }
        req.user = user;
        next();
    })(req,res,next);
}

module.exports = {authenticate}