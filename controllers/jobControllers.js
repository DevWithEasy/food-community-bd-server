const Job = require('../model/Job');
const createError = require('../utils/createError')

exports.createJob =async(req,res,next)=>{
    const {id} = req.user
    try{
        //CREAT Job
        const newJob = new Job({
          ...req.body,
          userId : id,
          lastDate : new Date(req.body.lastDate)
        })

        //SAVE Job
        await newJob.save()
        res.status(200).json({
          success : true,
          status : 200,
          message : "Job published successfully"
        })

    }catch(err){
        res.status(500).send(err.message)
    }
  }

exports.getJob =async(req,res,next)=>{
      const {id} = req.params
      try{
        await Job.updateOne({_id : id},{$inc:{
          views : +1
        }})
        const job = await Job.findOne({_id : id})
        if(!job) return next(createError(404,"Not Found"))
        res.status(200).json({
          success : true,
          status : 200,
          data : job
        })
      }catch(err){
        res.status(500).send(err.message)
      }
  }

  exports.getAllJob =async(req,res,next)=>{
        const {id} = req.params
        try{
          const jobs = await Job.find({})
          if(!jobs) return next(createError(404,"Not Jobs Available now."))
          res.status(200).json({
            success : true,
            status : 200,
            data : jobs
          })
        }catch(err){
          res.status(500).send(err.message)
        }
    }

exports.updateJob =async(req,res,next)=>{
    const {id} = req.user
    try{
      //FIND THE Job
      const job = await Job.findOne({_id : req.params.id})

      //CHECK YOU ARE NOT OWER OF THIS Job
      if(id !== job.userId.valueOf()) return next(createError(403,"You cannot update this Job"))

      //UPDATE THE Job
      await Job.updateOne({_id : req.params.id},{$set:{
          ...req.body
        }})
      res.status(200).json({
        success : true,
        status : 200,
        message : "Job updated successfully"
      })
    }catch(err){
      res.status(500).send(err.message)
    }
}

exports.deleteJob =async(req,res,next)=>{
  const {id} = req.user
  try{
    //FIND THE Job
    const job = await Job.findOne({_id : req.params.id})

    //CHECK YOU ARE NOT OWNER OF THIS Job
    if(id !== job.userId.valueOf()) return next(createError(403,"You cannot delete this Job"))

    //DELETE THE Job
    await Job.deleteOne({_id: req.params.id})
    res.status(200).json({
      success : true,
      status : 200,
      message : "Job deleted successfully"
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}
