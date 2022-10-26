const Reply = require('../model/Reply');
const createError = require('../utils/createError')

exports.createReply =async(req,res,next)=>{
    const {id} = req.user
    try{
        //CREAT REPLY
        const newReply = new Reply({
          userId : id,
          commentId : req.params.commentId,
          text : req.body.text
        })

        //SAVE REPLY
        await newReply.save()
        res.status(200).json({
          success : true,
          status : 200,
          message : "Reply add successfully"
        })

    }catch(err){
        res.status(500).send(err.message)
    }
  }

exports.getReplys =async(req,res,next)=>{
      const {commentId} = req.params
      try{
        const replys = await Reply.find({commentId})
        res.status(200).json({
          success : true,
          status : 200,
          data : replys
        })
      }catch(err){
        res.status(500).send(err.message)
      }
  }

exports.updateReply =async(req,res,next)=>{
    const {id} = req.user
    try{
      //FIND THE REPLY
      const reply = await Reply.findOne({id:req.params.id})

      //CHECK YOU ARE NOT OWER OF THIS REPLY
      if(id !== reply.userId.valueOf()) return next(createError(403,"You cannot update this Job"))

      //UPDATE THE REPLY
      await Reply.updateOne({id:req.params.id},{$set:{
          text : req.body.text,
        }})
      res.status(200).json({
        success : true,
        status : 200,
        message : "Reply updated successfully"
      })
    }catch(err){
      res.status(500).send(err.message)
    }
}

exports.likeReply = async(req,res,next)=>{
  const {id} = req.user
  try {
    await Reply.updateOne({id : req.params.id},{
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

exports.unlikeReply = async(req,res,next)=>{
  const {id} = req.user
  try {
    await Reply.updateOne({id : req.params.id},{
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

exports.deleteReply =async(req,res,next)=>{
  const {id} = req.user
  try{
    //FIND THE REPLY
    const reply = await Reply.findOne({id:req.params.id})

    //CHECK YOU ARE NOT OWNER OF THIS REPLY
    if(id !== reply.userId.valueOf()) return next(createError(403,"You cannot delete this Job"))

    //DELETE THE REPLY
    await Reply.deleteOne({id:req.params.id})
    res.status(200).json({
      success : true,
      status : 200,
      message : "Reply deleted successfully"
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}
