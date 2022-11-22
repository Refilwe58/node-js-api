const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();


app.use(cors());
app.use(bodyparser.json());

const database=require('../Database/database.js');

///get vacancies based on faculty
router.get('/:faculty', (req, res) => {
    let faculty = req.params.faculty;
    if(faculty=="All"){
            let sql = `SELECT vac_title,vac_location,vac_position FROM vacancies `;
        database.query(sql, (err, result) => {
            if (err) throw err;
            else {
                res.status(201).send(result);
            };
        });
    }else{
        let sql = `SELECT vac_title,vac_location,vac_position FROM vacancies WHERE vac_faculty = '${faculty}'`;
        database.query(sql, (err, result) => {
            if (err) throw err;
            else {
                res.status(201).send(result);
            };
        });
   }
});

module.exports = router;
