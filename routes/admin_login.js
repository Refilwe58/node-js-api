const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

const jwt = require('jsonwebtoken');
app.use(cors());
app.use(bodyparser.json());

const database=require('../Database/database');


router.post('/admin',(req, res)=>{

    //instatiating user variables
    let email =req.body.email;
    let password=req.body.password;

    //retrieve the student if the student exists
    var sql = 'select * from admin where admin_email ="'+email+'" and admin_password="'+password+'" limit 1';
    database.query(sql,(err, result, fields)=>{
   
    if(err)
          return res.status(200).send("Failed to load data!"+err);
          else{
            //if the admin with the following credentials does not exist throw an error
             if(Object.entries(result).length===0){

                return res.status(200).send("An Admin with those  credentials does not exist");
                
    }else{
                
                //if the admin exists save the details to a session 
                Object.keys(result).forEach(function(key){
                    var row = result[key];
                    const user = { admin_name:row.admin_name,admin_id:row.admin_id ,
                        admin_email: row.admin_email,admin_surname: row.admin_surname}
                    const jsontoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                    req.session.Admin = {
                        "admin_email": row.admin_email,
                        "admin_id": row.admin_id,
                        "admin_name": row.admin_name,
                        "admin_surname": row.admin_surname,
                        "admin_password": row.admin_password                 
                    }
                    console.log(req.session.Admin.admin_id);
                    //code to display on postman
                    return res.status(200).json({message:"Log in was successful!\n",token:jsontoken });
           
                }); 
            }

     }
});

});


module.exports = router;