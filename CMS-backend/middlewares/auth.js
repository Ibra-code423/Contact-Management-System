const jwt = require('jsonwebtoken')
const User = require("../models/user")

module.exports = (req , res , next ) =>{
    const authHeader = req.header.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (error, payload) =>{
            if(error){
                return res.status(401).json({error : "Unauthorized"})
            }
            else{
                const user = await User.findOne({_id : payload._id}).select("-password");
                req.user = user;
                next();
            }   
        } )
    } else{
        res.status(401).json({error : "Forbidden"})
    }
}