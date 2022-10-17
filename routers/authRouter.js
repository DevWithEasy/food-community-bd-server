const router = require("express").Router()
const {signup,signin,sendVerificationEmail,verifyEmail} = require("../controllers/authControllers")
const verifyToken = require("../utils/verifyToken")
router.post("/signup",signup)
router.post("/signin",signin)
router.post("/verify",verifyToken,sendVerificationEmail)
router.get("/verify/:userId/:code",verifyToken,verifyEmail)

module.exports = router
