const JWT= require('jsonwebtoken')
require("dotenv").config();

module.exports=async(req,res,next)=>{
    const token = req.header('bearer-token');

    if(!token){
        return res.status(400).json({
            "msg": " Bearer token not found"
        })
    }
    
    try{
        let user= await JWT.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user=user.alumni_name
        next()
    }catch(error){
        return res.status(400).json({
            "msg": "Invalid Bearer token"
        })
    }
   

}