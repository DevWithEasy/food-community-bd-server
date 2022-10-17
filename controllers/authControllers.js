const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Verification = require('../model/Verification')
const createError = require('../utils/createError')

exports.signup=async(req,res,next)=>{
  const {username,name,email,password} = req.body
  try{
    //HASHED PASSWORD GENERATE
    const hashed = await bcrypt.hash(req.body.password,10)

    //VALIDATION
    if(!username || !name || !email || !password) return next(createError(406,"Please fill all fields"))

    //FIND USERNAME
    const findUsername = await User.findOne({username})

    if(findUsername)return next(createError(406,"Username already exists !"))

    //FIND EMAIL
    const findEmail = await User.findOne({email})

    if(findEmail) return next(createError(406,"Email address already exists !"))

    //NEW USER OBJECT
    const newUser = new User({
      ...req.body,
      password: hashed
    })

    //USER SAVE IN DATABASE
    newUser.save(err=>{
      if(err){
        next(createError(403,err.message));
      }else{
        res.status(200).json({
          success: true,
          status: 200,
          message: "Account created successfully!"
        })
      }
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.signin=async(req,res,next)=>{
  try{
    //FIND USER IN DATABASE
    const user = await User.findOne({$or:[{email:req.body.email},{username:req.body.email}]})

    //IF USER IS NOT IN DATABASE
    if(!user) return next(createError(404,"User not found !"))

    //CHECK USER PASSWORD
    const isValid = await bcrypt.compare(req.body.password, user.password)

    //IF PASSWORD IS NOT IN DATABASE
    if(!isValid) return next(createError(400,"Wrong credentials !"))

    const {password,...others} = user._doc

    //GENERATE JWT TOKEN
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("access_token",token,{
      httpOnly : true
    }).status(200).json({
      success : true,
      status : 200,
      message : others
    })

  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.sendVerificationEmail=async(req,res,next)=>{
  const {id} = req.user
  try{
    //GENERATE RANDOM NUMBER
    const verifyNumber = Math.floor(Math.random() * 900000)

    //GENERATE HASHED CODE
    const hashCode = await bcrypt.hash(verifyNumber.toString(),10)

    //FIND CODE IN DATABASE
    const findCode = await Verification.findOne({userId:id})

    if(findCode){
      //IF FIND IN DATABASE
      Verification.updateOne({userId:id},{$set:{
        verifyCode : hashCode,
        expiresAt : Date.now() + 21600000
      }},(err)=>{
        if(err){
          next(createError(403,err.message));
        }else{
          res.status(200).json({
            success: true,
            status: 200,
            message: "Verification code send successfully!"
          })
        }
      })
    }else{
      //IF CAN'T FIND IN DATABASE
      const newVerification = new Verification({
        userId : id,
        verifyCode : hashCode
      })

      //SAVE VERIFICATION CODE IN DATABASE
      newVerification.save(err=>{
        if(err){
          next(createError(403,err.message));
        }else{
          res.status(200).json({
            success: true,
            status: 200,
            message: "Verification code send successfully!"
          })
        }
      })
    }
  }catch(err){
    res.status(500).send(err.message)
  }
}
exports.verifyEmail=async(req,res,next)=>{
  const {id} = req.user
  const {userId,code} = req.params
  try{
    if(!userId || !code) return next(createError(400,"credentials not found"))

    const findCode = await Verification.findOne({userId:userId})

    //CODE NOT FOUND IN DATABASE
    if(!findCode) return next(createError(404,"Verifiaction code not found !"))

    //NOT MATCHED WITH LOGGED USER
    if(!id === findCode.userId) return next(createError(405,"Your are not allowed"))

    //EXPIRE CODE
    if(findCode.expiresAt < Date.now()) return next(createError(403,"Verification Code is expired"))

    //VALID CODE
    const isValid = await bcrypt.compare(code,findCode.verifyCode)
    if(!isValid) return next(createError(403,"Wrong verifiaction code !"))
    
    User.updateOne({id:id},{$set:{
      isVerified : true
    }},(err)=>{
      if(err) return next(createError(403,"Verification failed"))
      Verification.deleteMany({userId:id},(err)=>{
        if(err){
          next(createError(403,"Something went wrong"))
        }else{
          res.status(200).json({
            success: true,
            status: 200,
            message: "Verification successfully!"
          })
        }
      })
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}
