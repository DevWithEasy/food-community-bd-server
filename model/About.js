const mongoose = require('mongoose');
const aboutSchema = mongoose.Schema({
    userId : {
      type : Mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    dob: String,
    fathersName: String,
    mothersName: String,
    gender: String,
    marital: String,
    bloodGroup:String,
    nidNo:String,
    nationality:String,
    phone: String,
    image: String,
    facebook: String,
    linkedin : String,
    cv:String,
    status:String,
    presentAddress: {
    district: String,
    upzilla: String,
    area: String
    },
    permanentAddress: {
    district: String,
    upzilla: String,
    po: String,
    poCode: String,
    area: String
    },
    presentCompany: {
    name: String,
    designation:String,
    location: String,
    from: String,
    to: String
    },
    previousJob: [
        {
            name:String,
            designation:String,
            location:String,
            from:Date,
            to:Date,
        }
    ],
    responsibility:[String],
    ssc: {
    name: String,
    season: String,
    passingYear: String,
    group: String,
    result: String
    },
    collage: {
    name: String,
    season: String,
    passingYear: String,
    group: String,
    result: String
    },
    bsc: {
    name: String,
    season: String,
    passingYear: String,
    group: String,
    result: String
    },
    msc: {
    name: String,
    season: String,
    passingYear: String,
    group: String,
    result: String
    }
})

const About = mongoose.model('About',aboutSchema)
module.exports = About
