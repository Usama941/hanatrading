const mongoose = require("mongoose");

const loginSchema= new mongoose.Schema({
    Uname:
    {
        type:String,
        require:'Required'
    },
    password:
    {
        type:String,
        require:'Required'
    }
});
mongoose.model("login", loginSchema); 