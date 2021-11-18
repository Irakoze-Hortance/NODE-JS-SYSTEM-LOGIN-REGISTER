const db = require('../models');
const uri = "mongodb://localhost:27017/docs";
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
