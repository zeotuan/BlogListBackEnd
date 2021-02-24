const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
// ========================================Connect to mongo DB ==================================
const mongoUrl = config.MONGODB_URI
logger.info("what is this")
logger.info(mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        logger.info("connected to mongoDB")
    })
    .catch(error => {
        logger.error('error connecting to mongoDB', error.message)
        
    })


//====================================== using middleware ========================================    
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :response-time ms - :res[header]'))
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)
app.use(middleware.tokenExtracter)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndpoint)



module.exports = app