const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000
const router = require("./routes/routers");
var cors = require("cors");
app.use(
    cors({
      origin: "*",
    })
);
app.use(express.json());


app.listen(PORT,(req,res)=>{
    console.log(`App started on port ${PORT}`);
});
app.use("/api",router);


const dbConnect = require("./config/database");
dbConnect();


app.get("/", (req, res) => {
    res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});