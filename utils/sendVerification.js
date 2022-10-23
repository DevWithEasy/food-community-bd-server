const createError = require("./createError");
const transporter = require("./mailSystem/transporter");

const sendVerification = (mailOptions,res,next) =>{
  //SEND EMAIL
  transporter.sendMail(mailOptions,(err, data) => {
    if (err) {
      next(createError(403,err.message));
    }else
      res.status(200).json({
        success: true,
        status: 200,
        message: "Verification code send successfully!"
      })
  })

}

module.exports = sendVerification;
