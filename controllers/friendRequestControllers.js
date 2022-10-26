const User = require('../model/User');

exports.sendFriendRequest = async(req,res,next)=>{
  const {id} = req.user
  try {
    const user = await User.findOne({_id : id})

    if(user.friends.includes(req.params.id)) return next(createError(403,"Allready in friendlist"))

    const finduser = await User.findOne({_id : req.params.id})

    if(finduser.friendRequest.includes(req.params.id)) return next(createError(403,"Allready sent a request"))

    await User.updateOne({_id : req.params.id},{$addToSet:{
      "friendRequest" : id
    }})
    res.status(200).json({
      success : true,
      status : 200,
      message : "Resuest sent successfully"
    })
  }catch (err) {
    res.status(500).send(err.message)
  }
}

exports.cancelFriendRequest = async(req,res,next)=>{
  const {id} = req.user
  try {

    const finduser = await User.findOne({_id : req.params.id})

    if(!finduser.friendRequest.includes(req.params.id)) return next(createError(403,"You aren't sent a request"))

    await User.updateOne({_id : req.params.id},{$pull:{
      "friendRequest" : req.params.id
    }})
    res.status(200).json({
      success : true,
      status : 200,
      message : "Resuest cancel successfully"
    })
  }catch (err) {
    res.status(500).send(err.message)
  }
}

exports.acceptFriendRequest = async(req,res,next)=>{
  const {id} = req.user
  try {
    const user = await User.findOne({_id : id})

    const finduser = await User.findOne({_id : req.params.id})

    if(user.friends.includes(req.params.id) && finduser.friends.includes(id)) return next(createError(403,"Allready in friendlist"))

    await User.updateOne({_id : id},{
      $addToSet : {"friends" : req.params.id},
      $pull : {"friendRequest" : req.params.id}
    })

    await User.updateOne({_id : req.params.id},{
      $addToSet : {"friends" : id}
    })

    res.status(200).json({
      success : true,
      status : 200,
      message : "Resuest accepted successfully"
    })
  }catch (err) {
    res.status(500).send(err.message)
  }
}

exports.rejectFriendRequest = async(req,res,next)=>{
  const {id} = req.user
  try {
    const user = await User.findOne({_id : id})
    if(!user.friendRequest.includes(req.params.id)) return next(createError(403,"Not in friendlist"))

    await User.updateOne({_id : id},{
      $pull : {"friendRequest" : req.params.id}
    })

    res.status(200).json({
      success : true,
      status : 200,
      message : "Resuest rejected successfully"
    })
  }catch (err) {
    res.status(500).send(err.message)
  }
}

exports.unfiendRequest = async(req,res,next)=>{
  const {id} = req.user
  try {
    const user = await User.findOne({_id : id})

    const finduser = await User.findOne({_id : req.params.id})

    if(!user.friends.includes(req.params.id) && !finduser.friends.includes(id)) return next(createError(403,"You aren't in friendlist"))

    await User.updateOne({_id : id},{
      $pull : {"friends" : req.params.id}
    })

    await User.updateOne({_id : req.params.id},{
      $pull : {"friends" : id}
    })

    res.status(200).json({
      success : true,
      status : 200,
      message : "Unfriend successfully"
    })
  }catch (err) {
    res.status(500).send(err.message)
  }
}
