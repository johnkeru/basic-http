const { Router } = require('express')
const { renderLogin, renderRegister, login, register, logout } = require('../controllers/userController')

const userRouter = Router()


// show pages
userRouter.get('/login', renderLogin)
userRouter.get('/register', renderRegister)


// actions
userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/logout', logout)

module.exports = userRouter