const nodemailer = require("nodemailer");

const sendVerification = (reciever) =>{
  //CREATE TRANSPORTER
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user : process.env.EMAIL
      pass : process.env.PASSWORD
    }
  })

//CREATE MAIL OPTIONS
const mailOptions = {
  from : "devwitheasy@gmail.com",
  to : reciever,
  subject : "FoodCommunityBD Account verifiaction",
  html : `
      <p>Please verify your acount from <a href="http://www.foodcommunity."/> here</p>
      <p>This link with expire after 06 hours later.</p>
  `
}

}

module.exports = sendVerification;
