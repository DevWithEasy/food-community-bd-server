const About = require('../../model/About');
const createError = require('../createError')

//ID = USER_ID
//FIELD = ABOUT OBJECTS WHICH ARRAY VALUE WILL UPDATE
// VALUE = WHICH VALUE WILL ADD [REQ.BODY]

const addElement = (id,field,value,res,next) => {
    About.updateOne({"userId" : id},{$push:{
      field : value,
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
}

module.exports = addElement;
