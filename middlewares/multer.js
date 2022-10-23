const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = multer.diskStorage({})

const upload = multer({
    storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Invalid file type. Only jpg.jepg and png are allowed.'));
        }
    }
})

module.exports = upload
