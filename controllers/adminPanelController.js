/* control page functionality */
const expressReq=require("express");
const mongoose=require("mongoose");
const session=require('express-session');
const router =expressReq.Router();
require('./indexController')
/*for image upload*/
const path=require('path');
const multerReq= require("multer");
/*image uplaoid closed*/
const carmodel=mongoose.model("car"); 

/*same as your schema name of table in model* */
var Storage=multerReq.diskStorage({
    destination:"./public/uploadImagesDB/",
    filename:function(req, file,cb){ /**iski jagha jo marzi likh lo baad may explain krday ga */
        cb(null,file.fieldname + '_' + Date.now()+path.extname(file.originalname));
    }
});
var uploadImage= multerReq({storage:Storage}).single('imageUplaod');
function checklogin(req,res,next){
    if(req.session.username){
        
        next();
    }
    else{
        res.redirect('/indexPanel/loginAdmin')
    }
}
router.get("/carDataUpload",checklogin,function(req,res){
    res.render("carDataUpload")
});
router.get("/logout",checklogin,function(req,res){
   req.session.destroy(function(err){
       if(!err){console.log(req.session);
       }
   })
    
    res.redirect('/indexPanel/indexHana')     
});
/** post method call  */
router.post("/carDataUpload",uploadImage,checklogin, function(req, res){
    var modelCar=new carmodel();
    /* first variable from schema and second from html form type */
    modelCar.lotNumber=req.body.lotNumber;
    modelCar.carModel=req.body.carModel;
    modelCar.chassisNumber=req.body.chassisNumber;
    modelCar.odoMeter=req.body.odoMeter;
    modelCar.equipment=req.body.equipment;
    modelCar.price=req.body.price;
    modelCar.transmission=req.body.transmission;
    modelCar.imageUpload=req.file.filename;
    modelCar.save(function(err,doc){
        if(!err){
            res.render('carDataUpload',{label:"New Car data Uploaded"});
        }
        else{
            res.send("some error occur");
        }
    });
});
/* code to display data on admin panel*/


/**code to display data in dispalyData.html */
router.get("/adminHana",checklogin,function(req,res,next){
   
    carmodel.find(function(err,doc){
        if(!err){
            res.render("adminHana", {data:doc})
        }
    }).lean();
});

/* code to delete data*/
router.get("/adminHana/:id",checklogin,function(req,res){
    carmodel.findByIdAndDelete(req.params.id,function(err){
        if(!err){
            res.redirect("/adminPanel/adminHana");
        }
        else{
            res.send(err);
        } 
    });
});
router.get('/changePassword',checklogin,function(req,res){
    res.render('changePassword')
});
   router.get('/:id',checklogin,function(req,res){
       carmodel.findById({_id:req.params.id},req.body,{new:true},function(err,doc){
           if(!err){
            res.render('updateCarData',{carmodel:doc})
           }
       }).lean();

   }) ;  
 
router.post("/:id",uploadImage,checklogin,function(req,res){
    if(req.file){
        var dataUpdate={
            lotNumber:req.body.lotNumber,
             carModel:req.body.carModel,
             chassisNumber:req.body.chassisNumber,
             odoMeter:req.body.odoMeter,
             equipment:req.body.equipment,
             price:req.body.price,
             transmission:req.body.transmission,
             imageUpload:req.file.filename
         }
    }
    else{
        var dataUpdate={
            lotNumber:req.body.lotNumber,
             carModel:req.body.carModel,
             chassisNumber:req.body.chassisNumber,
             odoMeter:req.body.odoMeter,
             equipment:req.body.equipment,
             price:req.body.price,
             transmission:req.body.transmission,
        }
    }
var update=carmodel.findByIdAndUpdate(req.params.id,dataUpdate,{new:true});
update.exec(function(err,data){
    if(!err){
        res.redirect("/adminPanel/adminHana")
    }
})
});

module.exports=router;
