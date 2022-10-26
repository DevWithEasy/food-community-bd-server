
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
      type : String,
      required : true,
      unique : true,
      trim : true,
      min : 3,
      max : 15
    },
    name:{
      type : String,
      required : true,
    },
    email:{
      type : String,
      required : true,
      unique : true,
      trim : true,
      lowercase : true
    },
    password:{
      type : String,
      trim : true,
    },
    isVerified : {
      type : Boolean,
      default : false
    },
    image: {
      public_id : {
        type : String
      },
      url: {
        type : String
      }
    },
    friendRequest:[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
      }
    ],
    friends:[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
      }
    ],
    fromgoogle : {
      type : Boolean,
      default : false
    },
    type :{
      type : String,
      emun : ["Admin","User","Moderator"],
      default : "User"
    }
},{timestamps : true})

const User = mongoose.model('User',userSchema)
module.exports = User
