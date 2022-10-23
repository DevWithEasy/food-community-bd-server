const About = require('../../model/About');

//ID = USER_ID
//FIELD = ABOUT OBJECTS WHICH ARRAY VALUE WILL UPDATE
// VALUE = WHICH VALUE WILL ADD [REQ.BODY]

const updateElement = (id,field,value,res,next) => {
  About.updateOne({"field._id" :id},{$set:{
    "field.$.name" : req.body.name,
    "field.$.degree" : req.body.degree,
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
        message : "Successfully Deleted"
      })
    }
  })
}

module.exports = updateElement;
