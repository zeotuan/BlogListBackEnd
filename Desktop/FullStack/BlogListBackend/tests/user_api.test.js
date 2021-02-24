const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)


describe('testing creating user', () => {
    
    beforeAll(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()

    })

    test('test valid user can be created', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length + 1)
        const usernames = userAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })


    test('username length < 2 will not be created', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length)
        const usernames = userAtEnd.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    })

    test('password < 2 will not be created', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ml223131313',
            name: 'ma',
            password: 'sa'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length)
        const usernames = userAtEnd.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    })




})


afterAll(()=>{
    mongoose.connection.close()
})