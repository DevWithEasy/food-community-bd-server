const router = require("express").Router()
const {signup,signin,googleAuth,findUser,profileUpload,sendVerificationEmail,verifyEmail,forgetPassword,forgetVerify,deleteAccount} = require("../controllers/authControllers")
const verifyToken = require("../utils/verifyToken")
const upload = require("../middlewares/multer")

router.post("/signup",signup)
      .post("/signin",signin)
      .post("/google",googleAuth)
      .get("/find",findUser)
      .post("/image",verifyToken,upload.single("image"),profileUpload)

router.post("/verify",verifyToken,sendVerificationEmail)
      .put("/verify/:code",verifyToken,verifyEmail)

router.post("/forget/:userId",forgetPassword)
      .put("/forgetVerify/:userId/:code/:password",forgetVerify)

router.delete("/delete",verifyToken,deleteAccount)

module.exports = router
