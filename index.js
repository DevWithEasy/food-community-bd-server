require("dotenv").config()
const express = require('express');
const applyMiddleware = require('./middlewares/middlewares')
const errorHandler = require('./middlewares/errorHandler')
const applyRoutes = require("./routers/routes")
const app= express()
const dbConnection = require("./utils/dbConnection")

//middlewares
applyMiddleware(app)

//routers
applyRoutes(app)

//database
dbConnection()

//errorHandler
errorHandler(app)

app.listen(process.env.PORT || 3001 ,()=>console.log('Server is running'))
