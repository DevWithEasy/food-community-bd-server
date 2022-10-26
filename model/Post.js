const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  image : {
    public_id : {
      type : String
    },
    url : {
      type : String
    }
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

const Post = mongoose.model('Post',postSchema)
module.exports = Post
