const Post = require('../model/Post');
const createError = require('../utils/createError')
const cloudinary = require('../utils/cloudinary')

exports.createPost =async(req,res,next)=>{
    const {id} = req.user
    try{
      //IF POST WITH IMAGE
      if(req.file){
        //UPLOAD PHOTO
        const result = await cloudinary.uploader.upload(req.file.path,{
          folder : "postImage",
          resource_type : "auto"
        })

        //CREAT POST
        const newPost = new Post({
          userId : id,
          image :{
            public_id : result.public_id,
            url : result.url
          },
          text : req.body.text
        })

        //SAVE POST
        newPost.save(err => {
          if (err){
            cloudinary.uploader.destroy(result.public_id)
            next(createError(403,err.message))
          }
          res.status(200).json({
            success : true,
            status : 200,
            message : "Post published successfully"
          })
        })
      }

      //IF NOT IMAGE IN POST
      if(!req.file){
        //CREAT POST
        const newPost = new Post({
          userId : id,
          image :{
            public_id : "",
            url : ""
          },
          text : req.body.text
        })

        //SAVE POST
        newPost.save(err => {
          if (err){
            cloudinary.uploader.destroy(result.public_id)
            next(createError(403,err.message))
          }
          res.status(200).json({
            success : true,
            status : 200,
            message : "Post published successfully"
          })
        })
    }
    }catch(err){
        res.status(500).send(err.message)
    }
  }

exports.getPost =async(req,res,next)=>{
      try{
        const post = await Post.findOne({_id : req.params.id})
        res.status(200).json({
          success : true,
          status : 200,
          data : post
        })
      }catch(err){
        res.status(500).send(err.message)
      }
  }

exports.updatePost =async(req,res,next)=>{
    const {id} = req.user
    try{
      //FIND THE POST
      const post = await Post.findOne({_id:req.params.id})

      //CHECK YOU ARE NOT OWER OF THIS POST
      if(id !== post.userId.valueOf()) return next(createError(403,"You cannot update this post"))

      //UPDATE THE POST
      await Post.updateOne({_id:req.params.id},{$set:{
          text:req.body.text
        }})
      res.status(200).json({
        success : true,
        status : 200,
        message : "Post updated successfully"
      })
    }catch(err){
      res.status(500).send(err.message)
    }
}

exports.likePost = async(req,res,next)=>{
  const {id} = req.user
  try {
    await Post.updateOne({_id : req.params.id},{
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

exports.unlikePost = async(req,res,next)=>{
  const {id} = req.user
  try {
    await Post.updateOne({_id : req.params.id},{
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

exports.deletePost =async(req,res,next)=>{
  const {id} = req.user
  try{
    //FIND THE POST
    const post = await Post.findOne({_id:req.params.id})

    //CHECK YOU ARE NOT OWNER OF THIS POST
    if(id !== post.userId.valueOf()) return next(createError(403,"You cannot delete this post"))

    //DELETE POST IMAGE
    await cloudinary.uploader.destroy(post.image.public_id)

    //DELETE THE POST
    await Post.deleteOne({_id:req.params.id})
    res.status(200).json({
      success : true,
      status : 200,
      message : "Post deleted successfully"
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}
