var express = require('express');
const cors=require("cors")
var passport = require('passport');
const userRoutes=require('./routes/userRoutes')
var bodyParser = require('body-parser');
var app = express();
require("./config/database")

app.use(cors)
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret:"node js mongodb",
    resave:false,
    saveUninitialized:false
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

const baseUrlRoute="/api";
app.use(`${baseUrlRoute}users/`,userRoutes)
var port = process.env.PORT ||3000;
app.listen(port,function(){
    console.log("Server has started");
})