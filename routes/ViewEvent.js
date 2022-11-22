
const express = require('express');const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

app.use(cors());
app.use(bodyparser.json());
const db = require('../Database/database');


router.get('/',(req,res)=>{

      // const news_id = req.body.news_id;
        db.getConnection((err, connection) => {
       if(err) throw err
       console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * FROM events',(err,rows)=>{
          
         
             if(!err){
                 res.send(rows)
                 }
                 else
                 {
             console.log(err)
                 }
              })
         })
         });

         module.exports = router;