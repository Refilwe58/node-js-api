const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();
const jwtMiddleware=require('./jwtMiddleware')

app.use(cors());
app.use(bodyparser.json());

const db=require('../Database/database');


router.post('/create_event',jwtMiddleware, (req, res) => {
    const admin = req.decoded;
    const id = admin.admin_id
    if(id){
        let name=req.body.event_name;
        let location=req.body.event_location;
        let date=req.body.event_date;
        let time=req.body.event_time;
        let description=req.body.event_description;

    
        let sql = `INSERT INTO Events(event_name,event_location,event_date,event_time,event_description,admin_id)
        VALUES('${name}','${location}','${date}','${time}','${description}','${id}')`;
    //run the query


    db.query(sql, (err, results) => {
        if (err) return res.status(401).send(+err);
        else {
            return res.status(201).send({message:'Event created successfully'});
        }
            
    
    })

    }else{
        res.status(403).send("Unauthorized to create event")
    }
    


   

});

router.put('/update_event/:id',jwtMiddleware,(req,res)=>{
    const admin = req.decoded;
    const id = admin.admin_id
    if(id){
        ///sql query
        let sql=`UPDATE events SET 
                event_name = '${req.body.event_name}',event_location='${req.body.event_location}',event_date='${req.body.event_date}',event_description='${req.body.event_description}',admin_id='${id}'
                WHERE event_id = '${req.params.id}'`;
                //run query
                
                db.query(sql,(err,result)=>{
                    if(err) throw err;
                    else{
                        res.status(200).send("data updated");

                    }
                });
    } else{
        res.status(403).send("Unauthorized to update event")
    }
});


module.exports = router;