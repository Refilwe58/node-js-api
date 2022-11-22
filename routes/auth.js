const JWT= require('jsonwebtoken')
require("dotenv").config();

module.exports =async(req,res,next)=>{
    const token = req.header('bearer-token');
    if(!token){
        return res.status(400).json({
            "msg": " Bearer token not found"
        })
    }
    try{
        const beare=token.split(" ");
        const beaereToken = beare[1];
        req.tokens=beaereToken;
        next()
    }catch(error){
        return res.status(400).json({
            "msg": "Invalid Bearer token"
        })
    }
}