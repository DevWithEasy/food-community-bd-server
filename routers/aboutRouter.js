const router = require("express").Router()
const verifyToken = require("../utils/verifyToken")
const {getAbout,updateAbout,updatePresent,updateParmanent,addHighSchool,updateHighSchool,deleteHighSchool,addCollage,updateCollage,deleteCollage,addJob,updateJob,deleteJob} = require("../controllers/aboutControllers")

router.get("/me",verifyToken,getAbout)
      .put("/me",verifyToken,updateAbout)

router.put("/present_address",verifyToken,updatePresent)
      .put("/permanent_address",verifyToken,updateParmanent)

router.put("/high_school",verifyToken,addHighSchool)
      .put("/high_school/:id",verifyToken,updateHighSchool)
      .delete("/high_school/:id",verifyToken,deleteHighSchool)

router.put("/collage",verifyToken,addCollage)
      .put("/collage/:id",verifyToken,updateCollage)
      .delete("/collage/:id",verifyToken,deleteCollage)

router.put("/job",verifyToken,addJob)
      .put("/job/:id",verifyToken,updateJob)
      .delete("/job/:id",verifyToken,deleteJob)

module.exports = router
