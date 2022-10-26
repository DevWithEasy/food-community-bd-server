const router = require("express").Router()
const {sendFriendRequest,cancelFriendRequest,acceptFriendRequest,rejectFriendRequest,unfiendRequest} = require("../controllers/friendRequestControllers")
const verifyToken = require("../utils/verifyToken")

router.put("/sent_request/:id",verifyToken,sendFriendRequest)
      .put("/cancel_request/:id",verifyToken,cancelFriendRequest)
      .put("/accept_request/:id",verifyToken,acceptFriendRequest)
      .put("/reject_request/:id",verifyToken,rejectFriendRequest)
      .put("/unfriend_request/:id",verifyToken,unfiendRequest)
