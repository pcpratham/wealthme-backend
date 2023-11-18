const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log("Database connection Done!"); }).catch((err) => {
        console.log("Error in database connection");
        console.log(err.message);
    });
}

module.exports = dbConnect;


