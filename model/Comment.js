const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  postId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Post"
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

const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment
