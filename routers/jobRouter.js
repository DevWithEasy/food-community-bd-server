const router = require("express").Router()
const {createJob,getJob,updateJob,deleteJob,getAllJob} = require("../controllers/jobControllers")
const verifyToken = require("../utils/verifyToken")

router
      .post("/",verifyToken,createJob)
      .get("/:id",getJob)
      .get("/all",getAllJob)
      .put("/:id",verifyToken,updateJob)
      .delete("/:id",verifyToken,deleteJob)

module.exports = router
