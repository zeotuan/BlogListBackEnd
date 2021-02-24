const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

let token = null


beforeEach(async () =>{
    await Blog.deleteMany({})

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()
    token = await helper.getUserLoginToken()

    const blogObjects = helper.initialBlogs.map(blog  => {
        blog.user = savedUser._id
        return new Blog(blog)})
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('notes are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()

})

describe('testing post function', () => {



    test('blog can be created', async () => {
        const blog = {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5
        }
        
    
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(blog)
            .expect(200)
            .expect('Content-Type',/application\/json/)
        
    
        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length+1)
        
        const blogTitles = blogAtEnd.map(b => b.title)
        expect(blogTitles).toContain('Go To Statement Considered Harmful')
    
    })
    
    test('blog post without likes will have default 0 like', async () => {
        const blog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }
        
        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(blog)
            .expect(200)
            .expect('Content-Type',/application\/json/)
        
        expect(response.body.likes).toEqual(0)
    })
    
    test('blog without title and author will not be created', async () => {
        blogAtEnd = await helper.blogsInDb()
        const blog = {
            url: 'http://'
        }
    
        const responsee = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(blog)
            .expect(400)
    
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)
    
    })

})


test('blog can be updated', async () => {
    const blogAtStart = await helper.blogsInDb()
    const noteToBeUpdated = blogAtStart[0]
    noteToBeUpdated.title = 'New Title'
    const updatedNote = await api
        .put(`/api/blogs/${noteToBeUpdated.id}`)
        .send(noteToBeUpdated)
        .expect(200)
        .expect('Content-Type',/application\/json/)

    const blogAtEnd = await helper.blogsInDb()
    const titles = blogAtEnd.map(b => b.title)
    expect(titles).toContain('New Title')
})

describe('testing deleting blog', () => {

    

    test('blog can be deleted', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToBeDeleted = blogAtStart[0]
        await api
            .delete(`/api/blogs/${blogToBeDeleted.id}`)
            .set('Authorization', 'bearer ' + token)
            .expect(204)
    
        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtStart).toHaveLength(blogAtEnd.length+1)
    
        const titles = blogAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToBeDeleted.title)
    })
    
})






afterAll(()=> {
    mongoose.connection.close()
})