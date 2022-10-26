const router = require("express").Router()
const {createReply,getReplys,updateReply,likeReply,unlikeReply,deleteReply} = require("../controllers/replyControllers")
const verifyToken = require("../utils/verifyToken")

router
      .post("/:commentId",verifyToken,createReply)
      .get("/all/:commentId",getReplys)
      .put("/:id",verifyToken,updateReply)
      .put("/like/:id",verifyToken,likeReply)
      .put("/unlike/:id",verifyToken,unlikeReply)
      .delete("/:id",verifyToken,deleteReply)


module.exports = router
