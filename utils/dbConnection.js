const mongoose = require('mongoose')

const dbConnection = () =>{
  mongoose.connect(process.env.MONGODB_URI)
    .then(() =>{
      console.log('Database is connected')
    })
    .catch((err) =>{
      console.log(err.message)
    })
}

module.exports = dbConnection;
