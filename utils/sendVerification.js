const createError = require("./createError");
const transporter = require("./mailSystem/transporter");

const sendVerification = (type,reciever,code,res,next) =>{
  let mailOptions
  if(type === "verify"){
    mailOptions = {
      from : "devwitheasy@gmail.com",
      to : reciever,
      subject : "FoodCommunityBD Account Verification Code",
      html : `<h1>Wellcome to FoodCommunityBD</h1><p>Please verify your account.</p><p>Verification code: <b>${code}</b></p><p>This code is valid for 6 hours.after the code will invalid.</p>`
    }
  }else if(type === "forget"){
    mailOptions = {
      from : "devwitheasy@gmail.com",
      to : reciever,
      subject : "FoodCommunityBD Forget Password",
      html : `<h1>Wellcome to FoodCommunityBD</h1><p>You try get a new password.</p><p>Verification code: <b>${code}</b></p><p>This code is valid for 6 hours.after the code will invalid.</p>`
    }
  }else if(type === "twoFactor"){
    mailOptions = {
      from : "devwitheasy@gmail.com",
      to : reciever,
      subject : "FoodCommunityBD Two factor authentication code",
      html : `<h1>Wellcome to FoodCommunityBD</h1><p>You try to login your account.</p><p>Two factor authentication code: <b>${code}</b></p><p>This code is valid for 6 hours.after the code will invalid.</p>`
    }
  }

  //SEND EMAIL
  transporter.sendMail(mailOptions,(err, data) => {
    if (err) {
      next(createError(403,err.message));
    }else{
      res.status(200).json({
        success: true,
        status: 200,
        message: "Verification code send successfully!"
      })
    }
  })

}

module.exports = sendVerification;
