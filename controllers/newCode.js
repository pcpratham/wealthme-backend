const Codes = require("../models/Codes");

// console.log("running controller page");



function generateOTP() {
    // console.log("called generateOTP");
    const length = 6;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let otp = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset.charAt(randomIndex);
    }
  
    return otp;
}

exports.getOTP = async (req,res) => {
    try{
        // console.log("called getOTP");
        const otp = generateOTP();
        if(!otp){
            return res.status(404).json({
                success:false,
                message:"Error in generatingOTP",
            });
        }
        //checking of uniqueness of otp in entire database - PENDING
        const codeEntry = await Codes.create({
            code:otp,
        });

        return res.status(200).json({
            success:true,
            message:"Entry created successfully",
            otp:otp,
            // data : codeEntry,
        });


    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Error in generatingOTP",
        });
    }
}


