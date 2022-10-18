const router = require("express").Router()
const {signup,signin,sendVerificationEmail,verifyEmail,findUser,forgetPassword,forgetVerify} = require("../controllers/authControllers")
const verifyToken = require("../utils/verifyToken")
router.post("/signup",signup)
router.post("/signin",signin)
router.post("/verify",verifyToken,sendVerificationEmail)
router.put("/verify/:userId/:code",verifyToken,verifyEmail)
router.get("/find",findUser)
router.post("/forget/:userId",forgetPassword)
router.put("/forgetVerify/:userId/:code/:password",forgetVerify)

module.exports = router
