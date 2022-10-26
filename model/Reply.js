const mongoose = require('mongoose');
const replySchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  commentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Comment"
  },
  text : {
    type : String,
    required : true
  },
  likes : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    }
  ]
},{timestamps : true})

const Reply = mongoose.model('Reply',replySchema)
module.exports = Reply
