const Codes = require("../models/Codes");

exports.checkOTP = async (req,res) => {
    try{
        const {code} = req.body;
        if(!code){
            return res.status(404).json({
                success:false,
                message:"please enter code"
            });
        }

        //getting info about the most recent otp
        const recentOTP = await Codes.find({}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);
        if(recentOTP.length === 0){
            return res.status(404).json({
                success:false,
                message:"The code has expired",
            })
        }

        // code -> entry -> isUSed 
        const checkEntry = await Codes.find({code});
        if(checkEntry.length !== 0 && checkEntry[0].isUsed===true) {
            return res.status(404).json({
                success:false,
                message:"This code has already been used",
            });
        }

        // if(recentOTP[0].isUsed){
        //     return res.status(404).json({
        //         success:false,
        //         message:"OTP already used",
        //     });
        // }

        if(recentOTP[0].code !== code){
            return res.status(404).json({
                success:false,
                recentOTP:recentOTP[0].code,
                message:"Enter a valid code"
            })
        }
        let updatedEntry;
        if(recentOTP[0].code === code){
            updatedEntry = await Codes.findByIdAndUpdate(
                {_id:recentOTP[0]._id},
                {
                    code:code,
                    isUsed:true,
                },
                {new:true}
            );
        }

        console.log("hello");
        return res.status(200).json({
            success:true,
            message:"code is correct",
            data : updatedEntry
        })



    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error in checking otp",
            data:err.message
        });
    }
}