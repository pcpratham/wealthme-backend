const express = require('express');
const router = express.Router();

const {getOTP} = require("../controllers/newCode");
const {checkOTP} = require("../controllers/checkCode");


router.get('/codes',getOTP);
router.post("/codes/use",checkOTP);

module.exports = router;


