const session = require('express-session');
module.exports =async(req,res,next)=>{
if(req.session&& req.session.Alumni){
    next();
}
else{
    res.status(403).send({errorMessage:"you must be logged in"})
}

}