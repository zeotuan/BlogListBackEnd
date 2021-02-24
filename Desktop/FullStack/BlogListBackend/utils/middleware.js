const logger = require('./logger')


const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    
    if( error.name === "castError"){
        return response.status(400).send({error:"malformatted id"})
    }
    else if(error.name === 'ValidationError'){
        return  response.status(400).json({error: error.message})
    }
    else if(error.name === 'JsonWebTokenError: jwt must be provided'){
        return response.status(400).json({error:'invalid or missing token'})
    }

    next(error)
}


const requestLogger = (request,response,next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


const tokenExtracter = (request,response,next) => {
    const authorization = request.get('Authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7)
    }
    next()
}

module.exports = {
    errorHandler, requestLogger,unknownEndpoint, tokenExtracter
}