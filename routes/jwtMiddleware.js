const jwt= require('jsonwebtoken')
require("dotenv").config();

module.exports =async   (req, res, next) => {
    /**
     * In JWT it is convention that the token is provided to the server in the authorization header including a prefix,
     * separated by a space. The authorization header could be:
     * 'Token eyJhbGciOiJIUzI1NiIsInR...' or 'Bearer eyJhbGciOiJIUzI1NiIsInR...' or something like this.
     */
    const authString = req.headers['authorization'];
    if(typeof authString === 'string') {
      
  
      jwt.verify(authString, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) {
          res.sendStatus(403);
        } else {
          req.decoded = decoded;
          next();
          console.log(req.decoded)
          
        }
      });
    } else {
      res.sendStatus(403).send("Unauthorized");
    }
  };