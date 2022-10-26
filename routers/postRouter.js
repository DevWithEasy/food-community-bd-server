const router = require("express").Router()
const {createPost,getPost,updatePost,likePost,unlikePost,deletePost} = require("../controllers/postControllers")
const verifyToken = require("../utils/verifyToken")
const upload = require("../middlewares/multer")

router
      .post("",verifyToken,upload.single("image"),createPost)
      .get("/:id",getPost)
      .put("/:id",verifyToken,updatePost)
      .put("/like/:id",verifyToken,likePost)
      .put("/unlike/:id",verifyToken,unlikePost)
      .delete("/:id",verifyToken,deletePost)

module.exports = router
