const multer=require("multer")
const {validatedDoc,Doc}=require("../models/docModel")

const storage=multer.diskStorage({
    destination:async function(req,file,cb){
        cb(null,'../uploads');
    },
    filename:async function(req,file,cb){
        cb(null,file.originalname + '_' + Date.now());
    },
})
const upload= multer({
    storage:storage
})

addDocument=(req,res)=>{
    let body=req.body
    if(!body){
        return res.status(400).json({
            success:false,
            error:"You mmust provide document details"
        })
    }
    body={
        ...body,
        docFile:req.files
    }
    const error=validatedDoc(body)
    if(error) {
        return res.status(400).send(error.details)
    }
    const newDoc=new Doc(body)
    await newDoc.save()
    return res.status(201).json({
        success:true,
        doc:newDoc,
        message:"Document created successfully"
    })  
}

updateDocument=async(req,res)=>{
    
}