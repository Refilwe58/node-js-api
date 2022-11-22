const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();


app.use(cors());
app.use(bodyparser.json());

const database=require('../database/database');


router.get('/',(req, res)=>{

   
let sql = "SELECT alumni_id,alumni_name,alumni_surname,alumni_email,rpad(substr(alumni_password,1,2),10,'*') as alumni_password ,faculty FROM ALUMNI";

database.getConnection((err, connection)=>{
    if(err) throw err
connection.query(sql,(err, result)=>{
   
    if(err)
          return res.status(200).send("Failed to load data!"+err);
          else{
                    return res.status(200).send(result);

          }
});

});

});

module.exports = router;