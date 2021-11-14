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
    resave:false,
    saveUninitialized:false
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

const baseUrlRoute="/api";
app.use(`${baseUrlRoute}users/`,userRoutes)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});