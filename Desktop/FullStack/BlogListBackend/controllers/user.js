const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/',async (request,response,next) => {
    const body = request.body
    const saltRound = 10
    const passwordRegex = /^[a-zA-Z0-9]{3,}[a-zA-Z0-9]*/
    const usernameRegex = /^[a-zA-Z0-9]{3,}[a-zA-Z0-9]*/
    if(!passwordRegex.test(body.password) || !usernameRegex.test(body.username)){
        return response.status(400).json({error: 'invalid password or username'})
    }
    
    try {
        const passwordHash = await bcrypt.hash(body.password,saltRound)
        const user = new User({
            username:body.username,
            name:body.name,
            passwordHash
        }) 
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        response.status(400).send({
            error: error.message
        })
        next(error)
    }
})

userRouter.get('/', async (request,response,next) => {
    try {
        const users = await User.find({})
        if(users){
            response.json(users)
        }else{
            response.status(400).end()
        }    
    } catch (error) {
        next(error)
    }
    
})

module.exports = userRouter 