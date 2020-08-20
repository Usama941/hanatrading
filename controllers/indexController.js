/* control page functionality */
const expressReq=require("express");
const mongoose=require("mongoose");
const router =expressReq.Router();
var session=require('express-session');
/*for image upload*/
const path=require('path');
const multerReq= require("multer");
/*image uplaoid closed*/
const carmodel=mongoose.model("car");
const login = mongoose.model('login'); 

 
function checklogin(req,res,next){
    if(req.session.username){
        
        next();
    }
    else{
        res.redirect('/indexPanel/loginAdmin')
    }
}
/*same as your schema name of table in model* */
var Storage=multerReq.diskStorage({
    destination:"./public/uploadImagesDB/",
    filename:function(req, file,cb){ /**iski jagha jo marzi likh lo baad may explain krday ga */
        cb(null,file.fieldname + '_' + Date.now()+path.extname(file.originalname));
    }
});
var uploadImage= multerReq({storage:Storage}).single('imageUplaod');


/**code to display data in dispalyData.html */
router.get("/indexHana",uploadImage,function(req,res){
    carmodel.find(function(err,doc){
        if(!err){
            res.render("indexHana", {data:doc})
            
        }
    }).lean();
});

router.get("/detailedAds/:id",function(req,res){
    carmodel.findById({_id:req.params.id},req.body,{new:true},function(err,doc){
        if(!err){
         res.render('detailedAds',{carmodel:doc})
        }
 
 }).lean();
});

router.get("/loginAdmin",function(req,res){

res.render("loginAdmin");

});
router.post("/loginAdmin",function(req,res){
    var username=req.body.uname;
    var password=req.body.psw;

    var user= login.findOne({
        Uname:username,
 }).exec(function(err,user)
                   { 
                       if(user){
          if(user.password==password){

req.session.username=username;


 res.redirect('/adminPanel/adminHana');
        }
        else{
            res.render('loginAdmin',{err:'Password incorrect'})
        }
    }
    else{
        res.render('loginAdmin',{err:'Username incorrect'})
    }
    })
});

module.exports=router;