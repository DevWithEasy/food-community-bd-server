const Comment = require('../model/Comment');
const createError = require('../utils/createError')

exports.createComment =async(req,res,next)=>{
    const {id} = req.user
    try{
        //CREAT COMMENT
        const newComment = new Comment({
          userId : id,
          postId : req.params.postId,
          text : req.body.text
        })

        //SAVE COMMENT
        await newComment.save()
        res.status(200).json({
          success : true,
          status : 200,
          message : "Comment add successfully"
        })

    }catch(err){
        res.status(500).send(err.message)
    }
  }

exports.getComments =async(req,res,next)=>{
      const {postId} = req.params
      try{
        const comments = await Comment.find({postId})
        res.status(200).json({
          success : true,
          status : 200,
          data : comments
        })
      }catch(err){
        res.status(500).send(err.message)
      }
  }

exports.updateComment =async(req,res,next)=>{
    const {id} = req.user
    try{
      //FIND THE COMMENT
      const comment = await Comment.findOne({id:req.params.id})

      //CHECK YOU ARE NOT OWER OF THIS COMMENT
      if(id !== comment.userId.valueOf()) return next(createError(403,"You cannot update this Job"))

      //UPDATE THE COMMENT
      await Comment.updateOne({id:req.params.id},{$set:{
          text : req.body.text,
        }})
      res.status(200).json({
        success : true,
        status : 200,
        message : "comment updated successfully"
      })
    }catch(err){
      res.status(500).send(err.message)
    }
}

exports.likeComment = async(req,res,next)=>{
  const {id} = req.user
  try {
    await Comment.updateOne({id : req.params.id},{
      $addToSet : {likes : id}
    })
    res.status(200).json({
            success : true,
            status : 200,
            message:"Like add successfully",
        })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.unlikeComment = async(req,res,next)=>{
  const {id} = req.user
  try {
    await Comment.updateOne({id : req.params.id},{
      $pull : {likes : id}
    })
    res.status(200).json({
            success : true,
            status : 200,
            message:"Unlike successfully",
        })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.deleteComment =async(req,res,next)=>{
  const {id} = req.user
  try{
    //FIND THE COMMENT
    const comment = await Comment.findOne({id:req.params.id})

    //CHECK YOU ARE NOT OWNER OF THIS COMMENT
    if(id !== comment.userId.valueOf()) return next(createError(403,"You cannot delete this Job"))

    //DELETE THE COMMENT
    await Comment.deleteOne({id:req.params.id})
    res.status(200).json({
      success : true,
      status : 200,
      message : "Comment deleted successfully"
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}
