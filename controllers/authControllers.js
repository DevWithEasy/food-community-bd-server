const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const About = require('../model/About');
const Verification = require('../model/Verification')
const createError = require('../utils/createError')
const sendVerification = require('../utils/sendVerification')
const aboutObject = require('../utils/aboutObject')
const cloudinary = require('../utils/cloudinary')

exports.signup=async(req,res,next)=>{
  const {username,name,email,password} = req.body
  try{
    //HASHED PASSWORD GENERATE
    const hashed = await bcrypt.hash(req.body.password,10)

    //VALIDATION
    if(!username || !name || !email || !password) return next(createError(406,"Please fill all fields"))

    //FIND USERNAME
    const findUsername = await User.findOne({username : username})

    if(findUsername)return next(createError(406,"Username already exists !"))

    //FIND EMAIL
    const findEmail = await User.findOne({email : email})

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
      data : others
    })

  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.googleAuth = async(req,res,next)=>{
  try{
    const user = await User.findOne({email : req.body.email})
    if(user){
      const token = await jwt.sign({id:user._id},process.env.JWT_SECRET)

      res.cookie("access_token",token,{
        httpOnly : true
      }).status(200).json({
        success : true,
        status : 200,
        data : user._doc
      })
    }else{
      const newUser = new User({
        ...req.body,
        fromgoogle : true
      })
      const savedUser = await newUSer.save()
      const token = await jwt.sign({id:savedUser._id},process.env.JWT_SECRET)
      res.cookie("access_token",token,{
        httpOnly : true
      }).status(200).json({
        success : true,
        status : 200,
        data : savedUser._doc
      })
    }
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.findUser = async(req,res,next)=>{
  const {q} = req.query
  try{
    //FIND USER IN DATABASE
    const user = await User.findOne({$or:[{email:q},{username:q}]})

    //IF USER IS NOT IN DATABASE
    if(!user) return next(createError(404,"User not found"))
    const {password,...others} = user._doc
    res.status(200).json({
      success: true,
      status: 200,
      data: others
    })

  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.profileUpload = async(req,res,next) =>{
  const {id} = req.user
  try {
    //IF USER IS NOT UPLOAD PHOTO
    if(!req.file) return next(createError(404,"File not found"))

    //FIND LOGGED USER
    const user = await User.findOne({_id : id})

    //DESTUCTURE IMG PUBLIC_ID THAT USING TO DELETE
    const imgId = user.image.public_id

    //CLOUDINARY DELETE FUNCTION
    if(imgId){
      await cloudinary.uploader.destroy(imgId)
    }

    //UPLOAD IMG
    const result = await cloudinary.uploader.upload(req.file.path,{
      folder : "profilePhoto",
      resource_type : "auto"
    })

    //UPDATE USER
    User.updateOne({_id : id},{$set:{
      "image.url" : result.url,
      "image.public_id" : result.public_id
    }},(err)=>{
      if(err){
        next(createError(403,err.message))
      }else{
        res.status(200).json({
          success: true,
          status: 200,
          message: "Image uploaded successfully"
        })
      }
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

exports.sendVerificationEmail=async(req,res,next)=>{
  const {id} = req.user
  try{
    //FIND USER
    const user = await User.findOne({_id : id})
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
          sendVerification({
              from : "devwitheasy@gmail.com",
              to : user.email,
              subject : "FoodCommunityBD Account Verification Code",
              html : `<h1>Wellcome to FoodCommunityBD</h1><p>Please verify your account.</p><p>Verification code: <b>${verifyNumber}</b></p><p>This code is valid for 6 hours.after the code will invalid.</p>`
          },res,next)
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
          sendVerification({
              from : "devwitheasy@gmail.com",
              to : user.email,
              subject : "FoodCommunityBD Account Verification Code",
              html : `<h1>Wellcome to FoodCommunityBD</h1><p>Please verify your account.</p><p>Verification code: <b>${verifyNumber}</b></p><p>This code is valid for 6 hours.after the code will invalid.</p>`
          },res,next)
        }
      })
    }
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.verifyEmail=async(req,res,next)=>{
  const {id} = req.user
  const {code} = req.params
  try{
    if(!code) return next(createError(400,"credentials not found"))

    const findCode = await Verification.findOne({userId:id})

    //CODE NOT FOUND IN DATABASE
    if(!findCode) return next(createError(404,"Verifiaction code not found !"))

    //NOT MATCHED WITH LOGGED USER
    if(!id === findCode.userId) return next(createError(405,"Your are not allowed"))

    //EXPIRE CODE
    if(findCode.expiresAt < Date.now()) return next(createError(403,"Verification Code is expired"))

    //VALID CODE
    const isValid = await bcrypt.compare(code,findCode.verifyCode)
    if(!isValid) return next(createError(403,"Wrong verifiaction code !"))

    //UPDATE VERIFY STATUS
    User.updateOne({_id:id},{$set:{
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
    //CREATE ABOUT PAGE
    const newAbout = new About({
      ...aboutObject,userId : id
    })
    newAbout.save()
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.forgetPassword = async(req,res,next)=>{
  const {userId} = req.params
  try{
    //FIND USER IN DATABASE
    const user = await User.findOne({_id: userId})

    //GENERATE RANDOM NUMBER
    const verifyNumber = Math.floor(Math.random() * 900000)

    //GENERATE HASHED CODE
    const hashCode = await bcrypt.hash(verifyNumber.toString(),10)

    //FIND CODE IN DATABASE
    const findCode = await Verification.findOne({userId})

    if(findCode){
      //IF FIND IN DATABASE
      Verification.updateOne({userId:user._id,},{$set:{
        verifyCode : hashCode,
        expiresAt : Date.now() + 21600000
      }},(err)=>{
        if(err){
          next(createError(403,err.message));
        }else{
          sendVerification({
              from : "devwitheasy@gmail.com",
              to : user.email,
              subject : "FoodCommunityBD Account forget Password recovery Code",
              html : `<h1>Wellcome to FoodCommunityBD</h1><p>Please verify your account.</p><p>Verification code: <b>${verifyNumber}</b></p><p>This code is valid for 6 hours.after the code will invalid.</p>`
          },res,next)
        }
      })
    }else{
      //IF CAN'T FIND IN DATABASE
      const newVerification = new Verification({
        userId,
        verifyCode : hashCode
      })

      //SAVE VERIFICATION CODE IN DATABASE
      newVerification.save(err=>{
        if(err){
          next(createError(403,err.message));
        }else{
          sendVerification({
              from : "devwitheasy@gmail.com",
              to : user.email,
              subject : "FoodCommunityBD Account forget Password recovery Code",
              html : `<h1>Wellcome to FoodCommunityBD</h1><p>Please verify your account.</p><p>Verification code: <b>${verifyNumber}</b></p><p>This code is valid for 6 hours.after the code will invalid.</p>`
          },res,next)
        }
      })
    }

  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.forgetVerify = async(req,res,next) =>{
  const {userId,code,password} = req.params
  try{
    if(!userId || !code || !password) return next(createError(400,"credentials not found"))

    const findCode = await Verification.findOne({userId:userId})

    //CODE NOT FOUND IN DATABASE
    if(!findCode) return next(createError(404,"Verifiaction code not found !"))

    //EXPIRE CODE
    if(findCode.expiresAt < Date.now()) return next(createError(403,"Verification Code is expired"))

    //VALID CODE
    const isValid = await bcrypt.compare(code,findCode.verifyCode)
    if(!isValid) return next(createError(403,"Wrong verifiaction code !"))

    //NEW PASSWORD GENERATE
    const newPassword = await bcrypt.hash(password,10)
    User.updateOne({_id:userId},{$set:{
      password : newPassword
    }},(err)=>{
      if(err) return next(createError(403,"Verification failed"))
      Verification.deleteMany({userId:userId},(err)=>{
        if(err){
          next(createError(403,"Something went wrong"))
        }else{
          res.status(200).json({
            success: true,
            status: 200,
            message: "Verification successfully With mew password!"
          })
        }
      })
    })
  }catch(err){
    res.status(500).send(err.message)
  }
}

exports.deleteAccount = async(req, res, next)=>{
  const {id} = req.user
  try{
    //FIND LOGGED USER
    const user = await User.findOne({_id : id})

    //DESTUCTURE IMG PUBLIC_ID THAT USING TO DELETE
    const imgId = user.image.public_id

    //DELETE ACCOUNT
    await User.deleteOne({_id : id})

    //DELETE ABOUT
    await About.deleteOne({userId : id})

    //DELETE IMG FROM CLOUDINARY
    await cloudinary.uploader.destroy(imgId)

    res.status(200).json({
      success: true,
      status: 200,
      message: "Account deleted successfully"
    })
  }catch (err) {
    res.status(500).send(err.message)
  }
}
