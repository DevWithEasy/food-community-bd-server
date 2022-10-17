const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require ("cookie-parser");

const middlewares = [
  express.urlencoded({extended:false}),
  express.json(),
  morgan("dev"),
  cors(),
  cookieParser(),
]

const applyMiddleware = (app) =>{
  middlewares.map(m=>app.use(m))
}

module.exports = applyMiddleware
