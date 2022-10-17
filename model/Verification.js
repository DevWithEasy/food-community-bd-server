const mongoose = require('mongoose');
const verifySchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  verifyCode : {
    type : String,
    required : true
  },
  createdAt : {
    type : Date,
    default : Date.now()
  },
  expiresAt : {
    type : Date,
    default : Date.now() + 21600000
  }
})

const Verification = mongoose.model('Verification',verifySchema)
module.exports = Verification
