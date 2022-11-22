const express = require('express')
const boddParser = require('body-parser')
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const  port = process.env.PORT || 3100;

// files
const events=require('./routes/events');
const admin_login=require('./routes/admin_login');
const login=require('./routes/login');

const  getRegisterAPI = require('./routes/registerAPI');
const viewNews = require('./routes/viewNews');
const viewVacancies = require('./routes/vacancies');
const profile = require('./routes/profile');
const chat = require('./routes/chats');
const authorize=require('./routes/authroize')
const passUpdate=require('./routes/updatePassword');
const uploadGallery=require('./routes/uploadImages');
const viewEvents = require('./routes/ViewEvent');
const benefactor = require('./routes/viewBenefactor')
const viewAll=require('./routes/viewAll')
const app = express()
//instantiating 
app.use(boddParser.urlencoded({extended:true}))
app.use(boddParser.json())
app.use(cors({Origin: "*",
              Credentials: true,
        "Access-Control-Allow-Methods": 'GET,PUT,POST,DELETE',
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: origin, Content-Type, X-Auth-Token'"}));
app.use(express.json());
app.use(cookieParser());


const oneDay = 1000*60*60*24;



app.use(session({
    secret:'thisismysecret_keysadhasdkjasdh.!5tstdfahsxsdjs&*79798981hgfv',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}));



//APP.USE Routes declaration middleware
app.use('/api/v1/register',getRegisterAPI);
app.use('/api/v1/login',login);
app.use('/api/v1/viewNews',viewNews);
app.use('/api/v1/viewVacancies',viewVacancies);
app.use('/api/v1/viewProfile',profile);
app.use('/api/v1/chats',chat);
app.use('/api/v1/',admin_login)
app.use('/api/v1/event',events)
app.use('/api/v1/updatePassword',passUpdate);
app.use('/api/v1/uploadImages',uploadGallery);
app.use('/api/v1/viewEvents',viewEvents);
app.use('/api/v1/viewBenefactor',benefactor);
app.use('/api/v1/viewAll',viewAll);

//listener
app.listen(port,()=>{
    console.log('the server is running ' +port)
})
