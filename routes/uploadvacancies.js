const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app= express()
const port = process.env.PORT||7000
//directing to upload/connecting
const upload = require('./routes/upload');
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())



//when the path is upload go to uploud
app.use('/upload',upload);

//listen on environment port 7000
app.listen(port,() => console.log(`Listen on port ${port}`))