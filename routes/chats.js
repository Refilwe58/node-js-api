
const express = require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

const jwtMiddleware=require('./jwtMiddleware')
app.use(cors());
app.use(bodyparser.json());
const database = require('../Database/database.js');

///get all users except the logged in users
router.get('/get_users',jwtMiddleware, (req, res) => {
    const user=req.decoded
    const name=user.alumni_name;
    const id=user.alumni_id
    if(id){
        try{
            let userId=req.params.id;
            let sql = `SELECT alumni_id,alumni_name FROM alumni WHERE alumni_id != '${id}'`;
            database.getConnection((err, connection)=>{
                if(err) throw err
            connection.query(sql,(err, result)=>{
                connection.release();
                if (err) throw err;
                else {
                    res.status(201).send(result);
                    };
                });
            });
            }catch(err){
                res.status(402).send("Something went wrong :"+ err);
            }
    }else{
        res.status(500).send("Unauthorized ")
         }
   
});

///send messages
router.post('/send_messages/:receiverId/',jwtMiddleware, (req, res) => {
    const user=req.decoded
    const name=user.alumni_name;
    const id=user.alumni_id
    if(id){
        try{
            let receiverId = req.params.receiverId;
            let senderId =id;
            let message = req.body.message;
            if (message != null && senderId != receiverId) {
                let sql = `INSERT INTO chatbox(sender_id,receiver_id,message)
                    VALUES('${senderId}','${receiverId}','${message}')`;
                //run the query

                database.getConnection((err, connection)=>{
                    if(err) throw err
                    connection.query(sql,(err)=>{
                        connection.release();
                        if (err) return res.status(401).send(err);
                        else {
                            return res.send('messages sent');

                            }
                        
                        });
                    })
            } else{
                res.status(405).send("Something is missing :");
            }
        
        }catch(err){
            res.status(402).send("Something went wrong :"+ err);
        }
    }else{
        res.status(403).send("Unauthorized to send message")
    }
});

//get messages
router.get('/get_message/:id',jwtMiddleware, (req, res) => {
    const user=req.decoded
    const name=user.alumni_name;
    const id=user.alumni_id
    if(id){
        try{
            receiverId = req.params.id;
            let sql = `SELECT * FROM chatbox  WHERE sender_Id='${id}' AND receiver_Id='${receiverId}' 
                    OR  sender_Id='${receiverId}' AND receiver_Id='${id}'`;
            //run query
            database.getConnection((err, connection)=>{
                if(err) throw err
                connection.query(sql,(err, result)=>{
                    connection.release();
                    if (err) throw err;
                    else {
                        res.status(201).send(result);
                    };
                });
            
            });
        }catch(err){
            res.status(402).send("Something went wrong :"+ err);
        }
    }else{
        res.status(403).send("Unauthorized to send message")
    }
});

module.exports = router;
