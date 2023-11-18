const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL).then(() => { console.log("Database connection Done!"); }).catch((err) => { console.log("Error in database connection") });
}

module.exports = dbConnect;


