const mongoose = require('mongoose');
const jobSchema = mongoose.Schema({
  userId : {
    type : Mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
})

const Job = mongoose.model('Job',jobSchema)
module.exports = Job
