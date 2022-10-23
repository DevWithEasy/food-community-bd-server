const router = require("express").Router()
const verifyToken = require("../utils/verifyToken")
const {getAbout,updateAbout,updatePresent,updateParmanent,addHighSchool,updateHighSchool,deleteHighSchool,addCollage,updateCollage,deleteCollage,addJob,updateJob,deleteJob} = require("../controllers/aboutControllers")

router.get("/me",verifyToken,getAbout)
router.put("/me",verifyToken,updateAbout)

router.put("/presentAddress",verifyToken,updatePresent)
router.put("/permanentAddress",verifyToken,updateParmanent)

router.put("/highSchool",verifyToken,addHighSchool)
router.put("/highSchool/:id",verifyToken,updateHighSchool)
router.delete("/highSchool/:id",verifyToken,deleteHighSchool)

router.put("/collage",verifyToken,addCollage)
router.put("/collage/:id",verifyToken,updateCollage)
router.delete("/collage/:id",verifyToken,deleteCollage)

router.put("/job",verifyToken,addJob)
router.put("/job/:id",verifyToken,updateJob)
router.delete("/job/:id",verifyToken,deleteJob)

module.exports = router
