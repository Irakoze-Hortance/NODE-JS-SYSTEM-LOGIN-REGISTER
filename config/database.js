const db = require('../models');
const uri = "mongodb+srv://hortance:hortance@cluster0.0pkui.mongodb.net/saintly?retryWrites=true&w=majority";
db.mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

.then(() =>{
    console.log("Connection succefully established")
})
.catch(err =>{
    console.error("Error connecting",err)
})
