const mongoose = require("mongoose");

const code_model = new mongoose.Schema({
    code:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 1*60,
    },
    isUsed:{
        type:Boolean,
        default:false
    }
});


module.exports = mongoose.model("Codes", code_model);