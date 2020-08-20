const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/hanaTrading",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}, function (error,db) {
   if(!error)
   {
       console.log("Connection successful");
   } 
   else{
       console.log("Connection is not successful");
   }
});
const car=require("./schema");
require('./loginSchema')