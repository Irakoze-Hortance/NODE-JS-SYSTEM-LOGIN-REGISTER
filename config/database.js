const db = require('mongoose');
const uri = "mongodb+srv://hortance:hortance@cluster0.0pkui.mongodb.net/saintly?retryWrites=true&w=majority";
db.Mongoose.connect(MONGO_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})

.then(() =>{
    console.log("Connection succefully established]")
})
.catch(err =>{
    console.error("Error connecting",err)
})
