const nodemailer = require("nodemailer");

const sendVerification = () =>{
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user : process.env.EMAIL
      pass : process.env.PASSWORD
    }
  })
}

module.exports = sendVerification;
