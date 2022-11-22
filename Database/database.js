const mysql=require('mysql2');

var db = mysql.createPool({
    connectionLimit:15,
    host:'localhost',
    user: 'root',
    password: '',
    database: 'alumnidb',
});

/*db.getConnection((err)=>{
    if(!err)
    console.log("Heroku DB connection accepted");
    else
    console.log("DB connection failed \n Error:"+JSON.stringify(err,undefined, 2));
});*/

module.exports=db;