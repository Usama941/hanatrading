const mongoose = require("mongoose");

const carSchema= new mongoose.Schema({
    lotNumber:
    {
        type:String,
        require:'Required'
    },
    carModel:
    {
        type:String,
        require:'Required'
    },
    chassisNumber:
    {
        type:String,
        require:'Required'
    },
    odoMeter:
    {
        type:String,
        require:'Required'
    },
    equipment:
    {
        type:String,
        require:'Required'
    },
    price:
    {
        type:String,
        require:'Required'
    },
    transmission:
    {
        type:String,
        require:'Required'
    },
    imageUpload:
    {
        type:String,
        require:'Required'
    }
});
mongoose.model("car", carSchema); 