const mongoose = require('mongoose');
const jobSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  title : {
    type : String,
    required : true
  },
  company : {
    type : String,
    required : true
  },
  location : {
    type : String,
    required : true
  },
  vacancy:{
    type : String,
    required : true
  },
  salary :{
    type : String,
    required : true
  },
  employeeStatus:{
    type : String,
    required : true
  },
  workPlace:{
    type : String,
    required : true
  },
  jobContext:{
    type : String
  },
  education : {
    type : String,
    required : true
  },
  experience : {
    type : String,
    required : true
  },
  additional : {
    type : String
  },
  others : {
    type : String,
  },
  contact : {
    type : String,
    required : true
  },
  views: {
    type : Number,
    default : 0
  },
  lastDate :{
    type : Date
  }
},{timestamps : true})

const Job = mongoose.model('Job',jobSchema)
module.exports = Job
