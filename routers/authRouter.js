const router = require("express").Router()
const {signup,signin,sendVerificationEmail,verifyEmail,findUser,forgetPassword,forgetVerify,profileUpload} = require("../controllers/authControllers")
const verifyToken = require("../utils/verifyToken")
const upload = require("../middlewares/multer")

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/verify",verifyToken,sendVerificationEmail)
router.put("/verify/:code",verifyToken,verifyEmail)
router.get("/find",findUser)
router.post("/forget/:userId",forgetPassword)
router.put("/forgetVerify/:userId/:code/:password",forgetVerify)
router.post("/image",verifyToken,upload.single("image"),profileUpload)

module.exports = router
