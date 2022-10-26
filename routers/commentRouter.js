const router = require("express").Router()
const {createComment,getComments,updateComment,likeComment,unlikeComment,deleteComment} = require("../controllers/commentControllers")
const verifyToken = require("../utils/verifyToken")

router
      .post("/:postId",verifyToken,createComment)
      .get("/all/:postId",getComments)
      .put("/:id",verifyToken,updateComment)
      .put("/like/:id",verifyToken,likeComment)
      .put("/unlike/:id",verifyToken,unlikeComment)
      .delete("/:id",verifyToken,deleteComment)

module.exports = router
