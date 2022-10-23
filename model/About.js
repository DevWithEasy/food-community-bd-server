const mongoose = require('mongoose');
const aboutSchema = mongoose.Schema({
    userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    dob: Date,
    fathersName: String,
    mothersName: String,
    gender: String,
    marital: String,
    bloodGroup:String,
    nidNo:String,
    nationality:String,
    phone: String,
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
        postOffice: String,
        postCode: String,
        area: String
    },
    jobs: [
        {
            name: String,
            designation: String,
            location: String,
            from: Date,
            to: Date,
            current : {
              type: Boolean,
              default: false
            }
        }
    ],
    responsibility: String,
    highSchool:[
      {
        name: String,
        degree: String,
        season: String,
        passingYear: String,
        group: String,
        result: String
      }
    ],
    collage: [
      {
        name: String,
        degree: String,
        season: String,
        passingYear: String,
        group: String,
        result: String
      }
    ]
})

const About = mongoose.model('About',aboutSchema)
module.exports = About
