const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async  (request, response,next) => {
    try {
      const blogs = await Blog.find({})
      response.json(blogs)
    } catch (error) {
      next(error)
    }
  })
  
blogRouter.post('/', async (request, response,next) => {
    const body = request.body
    try {
      const decodedToken = jwt.verify(request.token,process.env.SECRET)

      if(!request.token || !decodedToken.id){
        return response.status(400).json({
          error:'token  missing or invalid'
        })
      }
      if(body.title === undefined || body.author === undefined){
        return response.status(400).json({
          error:'content missing'
        })
      }
      const user = await User.findById(decodedToken.id)
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user:user._id

      })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog)  
    } catch (error) {
      next(error)
    }
  })


blogRouter.put('/:id', async(request, response, next) => {
  const body = request.body
  const id = request.params.id
  if(body.title === undefined || body.author === undefined ){
    return response.status(400).json({
      error:"missing content"
    })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }
    

  try{
    const updatedNote = await Blog.findByIdAndUpdate(id,blog,{new:true})
    response.json(updatedNote)
  }catch(error){
    next(error)
  }

})

blogRouter.delete('/:id', async(request, response, next) => {
  try{
    const id = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!request.token || !decodedToken.id){
      return response.status(400).json({error:'missing or invalid token'})
    }
    
    
    const blog = await Blog.findById(id)
    if(blog.user.toString() !== decodedToken.id.toString()){
      return response.status(400).json({error:'only owner of blog can delete'})
    }
    
    blog.delete() 
    response.status(204).end()
  }catch(error){
    next(error)
  }
})

module.exports = blogRouter
  