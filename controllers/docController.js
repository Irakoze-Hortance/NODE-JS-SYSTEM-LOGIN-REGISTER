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
    const body=req.body
    if(!body){
        return res.status(400).json({
            success:false,
            error:"Provide all required fields"
        })
    }

    Doc.findOne({
        _id:req.params.id
    },(err, doc)=>{
        if(err)
            return res.status(400).json({
                err,
                message:"Document not found",
            })
            const docName=body.name;
            const desc=body.description;
            const authors=body.authors;
            
            const updates={docName,desc,authors};

            if(req.file){
                const docFile = req.file.filename
                updates.docFile=docFile;
            }
            doc.save()
                .then(() =>{
                    return res.status(200).json({
                        success: true,
                        id:doc._id,
                        message:"Document updated"
                    })
                })
    },)
}

removeDocument=async (req, res)=>{
    await Doc.findByIdAndDelete({
        _id:req.params.id,
    },(err,doc)=>{
        if(err) return res.status(400).json({ success:false,error:err})
    

    if(!doc) return res.status(404).json({success:false,message:"Document not found"})
    return res.status(200).json({success:true,data:doc})

}).catch(err=>res.send({success:false,message:err.message}))
}

getDocuments=(req,res)=>{
    Doc.find()
        .then((foundDocs)=>{
            if(foundDocs.length <=0){
                return res.status(400).send(foundDocs)
            }else{
                return res.status(200).json({success:true,data:foundDocs})
            }
        }).catch(()=>{
            return res.status(400).send({
                success:false,
                message:"Something went wrong"
            })
        })
}

getByName=(req,res)=>{
    
}