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
      required : true,
      trim : true,
      min : 6,
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
    followers:[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
      }
    ],
    followings:[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
      }
    ]
},{timestamps : true})

const User = mongoose.model('User',userSchema)
module.exports = User
