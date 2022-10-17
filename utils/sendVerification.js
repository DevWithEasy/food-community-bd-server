const nodemailer = require("nodemailer");
const createError = require("./createError");

const sendVerification = (reciever,userId,code,req,res,next) =>{
  //CREATE TRANSPORTER
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user : process.env.EMAIL,
      pass : process.env.PASSWORD
    }
  })

  //CREATE MAIL OPTIONS
  const mailOptions = {
    from : "devwitheasy@gmail.com",
    to : reciever,
    subject : "FoodCommunityBD Account verifiaction",
    html : `<p>press <a href=${"http://localhost:3001/api/auth/verify/" + userId + "/" + code}>Here</a></p>`
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
