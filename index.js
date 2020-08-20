const con = require('./model')
const expressReq=require("express");
const appliaction=expressReq();
const path=require("path");
var session = require('express-session')
const expressHandlebars=require("express-handlebars");
const bodyParser=require("body-parser");
const adminPanelContoller=require('./controllers/adminPanelController');
const indexContoller=require('./controllers/indexController');

appliaction.use(bodyParser.urlencoded({
    extended:true /* utf-8*/
}));
appliaction.set("views",path.join(__dirname,"/views/"));
appliaction.engine("hbs",expressHandlebars({
    extname:"hbs",
    defaultLayout:"mainlayout",
    layoutsDir:__dirname+"/views/layouts"
}));
appliaction.set("view engine","hbs")

/*session code*/
appliaction.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
 appliaction.use("/adminPanel",adminPanelContoller);
 appliaction.use("/indexPanel",indexContoller);
 appliaction.use(expressReq.static(__dirname+'/public/stylesheet/'));
 appliaction.use(expressReq.static(__dirname+'/public/uploadImagesDB'));
 appliaction.use(expressReq.static(__dirname+'/public/images'));
 
appliaction.listen(3100);
