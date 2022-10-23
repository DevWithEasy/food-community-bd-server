const About = require('../model/About');
const createError = require('../utils/createError')

exports.getAbout=async(req, res, next)=>{
  const {id} = req.user
  try{
    const findAbout = await About.findOne({userId : id})
    if(!findAbout) return next(createError(404,"Not Found !"))
    res.status(200).json({
      sucess : true,
      status : 200,
      data : findAbout
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.updateAbout=async(req, res, next)=>{
  const {id} = req.user
  const {dob,fathersName,mothersName,gender,marital,bloodGroup,nidNo,nationality,phone,facebook,linkedin,cv,status} = req.body
  try{
    const findAbout = await About.findOne({userId : id})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId : id},{$set:{
      dob,fathersName,mothersName,gender,marital,bloodGroup,nidNo,nationality,phone,facebook,linkedin,cv,status
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully updated"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.updatePresent=async(req, res, next)=>{
  const {id} = req.user
  try{
    const findAbout = await About.findOne({userId : id})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId : id},{$set:{
      "presentAddress.area" : req.body.area,
      "presentAddress.upzilla" : req.body.upzilla,
      "presentAddress.district" : req.body.district
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully updated"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.updateParmanent=async(req, res, next)=>{
  const {id} = req.user
  try{
    const findAbout = await About.findOne({userId : id})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId : id},{$set:{
      "permanentAddress.area" : req.body.area,
      "permanentAddress.postOffice" : req.body.postOffice,
      "permanentAddress.postCode" : req.body.postCode,
      "permanentAddress.upzilla" : req.body.upzilla,
      "permanentAddress.district" : req.body.district
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully updated"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.addHighSchool=async(req, res, next)=>{
  const {id} = req.user
  try {
    const findAbout = await About.findOne({userId : id})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId : id},{$push:{
      highSchool : req.body
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Added"
        })
      }

    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.updateHighSchool=async(req, res, next)=>{
  const userId = req.user.id
  const {id} = req.params
  try {
    const findAbout = await About.findOne({userId})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({"highSchool._id" :id},{$set:{
      "highSchool.$.name" : req.body.name,
      "highSchool.$.degree" : req.body.degree,
      "highSchool.$.season" : req.body.season,
      "highSchool.$.passingYear" : req.body.passingYear,
      "highSchool.$.group" : req.body.group,
      "highSchool.$.result" : req.body.result
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Updated"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.deleteHighSchool=async(req, res, next)=>{
  const userId = req.user.id
  const {id} = req.params
  try {
    const findAbout = await About.findOne({userId})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId},{$pull:{
      highSchool : {_id : id}
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Deleted"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.addCollage=async(req, res, next)=>{
  const {id} = req.user
  try {
    const findAbout = await About.findOne({userId : id})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId : id},{$push:{
      collage : req.body
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Added"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.updateCollage=async(req, res, next)=>{
  const userId = req.user.id
  const {id} = req.params
  try {
    const findAbout = await About.findOne({userId})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({"collage._id" :id},{$set:{
      "collage.$.name" : req.body.name,
      "collage.$.degree" : req.body.degree,
      "collage.$.season" : req.body.season,
      "collage.$.passingYear" : req.body.passingYear,
      "collage.$.group" : req.body.group,
      "collage.$.result" : req.body.result
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Updated"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.deleteCollage=async(req, res, next)=>{
  const userId = req.user.id
  const {id} = req.params
  try {
    const findAbout = await About.findOne({userId})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId},{$pull:{
      collage : {_id : id}
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Deleted"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.addJob=async(req, res, next)=>{
  const {id} = req.user
  try {
    const findAbout = await About.findOne({userId : id})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId : id},{$push:{
      jobs : req.body
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Added"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.updateJob=async(req, res, next)=>{
  const userId = req.user.id
  const {id} = req.params
  try {
    const findAbout = await About.findOne({userId})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({"jobs._id" :id},{$set:{
      "jobs.$.name" : req.body.name,
      "jobs.$.designation" : req.body.designation,
      "jobs.$.location" : req.body.location,
      "jobs.$.from" : req.body.from,
      "jobs.$.to" : req.body.to,
      "jobs.$.current" : req.body.current,
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Updated"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.deleteJob=async(req, res, next)=>{
  const userId = req.user.id
  const {id} = req.params
  try {
    const findAbout = await About.findOne({userId})
    if(!findAbout) return next(createError(404,"Not Found !"))
    About.updateOne({userId},{$pull:{
      jobs : {_id : id}
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          sucess : true,
          status : 200,
          message : "Successfully Deleted"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}
