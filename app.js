const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const db=require('./models')
const Role=db.role;
const dbConfig=require('./config/database')


const app=express();
var corsOption={
  origin:"http://localhost:8081"
};

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res) => {
  res.json({message:"Welcome"})
  res.render('home')
});
app.set('view engine','ejs')
require("./routes/authRoutes")(app)
require("./routes/userRoutes")(app)

const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`);
});

function initial(){
  Role.estimatedDocumentCount((err,count)=>{
    if(!err && count===0){
      new Role({
        name:"user"
      }).save(err=>{
        if(err){console.log("error",err)}
        console.log("added 'user' role to collection")
      });
      new Role({
        name:"moderator"
      }).save(err=>{
        if(err){console.log("Error",err)}
        console.log("Added 'moderator' role to collection")
      });
      new Role({
        name:"admin"
      }).save(err=>{
        if(err){console.log("Error",err)}
        console.log("Added 'admin' role to collection")
      })
    }
  })
}