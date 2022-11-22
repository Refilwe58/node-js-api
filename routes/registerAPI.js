const express = require('express')
const mysql = require('mysql')
const getRegisterAPI = express.Router();

const pool = require('../Database/database.js');

getRegisterAPI.post('/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO alumni SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.send({message:'Successfully  Registered'})
        } else {
            console.log(err)
        }
          })
    })
});

module.exports = getRegisterAPI;
