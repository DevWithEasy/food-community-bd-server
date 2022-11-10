const jwt = require('jsonwebtoken');
const createError = require('./createError')

const verifyToken =(req,res,next)=>{
  const token = req.headers["x-access-token"]
  
  if(!token) return next(createError(401,"You are not authenticated"))

  //VERIFY TOKEN
 jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
   if(err) return next(createError(403,"Token isn't valid"))
   req.user = user
   next()
 })
}

module.exports = verifyToken
