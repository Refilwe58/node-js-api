const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();
const session = require('express-session');
const jwtMiddleware=require('./jwtMiddleware')
app.use(cors());
app.use(bodyparser.json());

const database=require('../Database/database.js');
const cookieParser = require('cookie-parser');

router.get('/', (req, res)=>{
  
//retrieve the student if the student exists
  try{
  var sql = 'select * from newsfeed where news_faculty="'+req.session.Alumni.faculty+'" OR lower(faculty)="all" order by dateStamp';
  database.getConnection((err, connection)=>{
    if(err) throw err
  connection.query(sql,(err, result)=>{
    connection.release();

      if(err)
            return res.status(200).send("Failed to load data!"+err);
            else{
              //if the alumni with the following credentials does not exist throw an error
              if(Object.entries(result).length===0){

                  return res.status(200).send("No news");
                  
              }else{
                      //code to display on postman
                      return res.status(200).send(result);
            
                  
              }

            }
          });
});
}catch(err){

var sql = 'select * from newsfeed ';

database.getConnection((err, connection)=>{
  if(err) throw err
connection.query(sql,(err, result)=>{
  connection.release();
  if(err)
        return res.status(200).send("Failed to load data!"+err);
        else{
          //if the alumni with the following credentials does not exist throw an error
           if(Object.entries(result).length===0){

              return res.status(200).send("No news");
              
          }else{
                  //code to display on postman
                  return res.status(200).send(result);
         
              
          }

        }
      })
});
}

});

module.exports = router;
