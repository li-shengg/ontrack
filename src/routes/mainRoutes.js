const express = require('express')
const router = express.Router()

//Routes
const registerRoutes = require('../routes/registerRoutes')
const loginRoutes = require('../routes/loginRoutes')
const usersRoutes  =require('../routes/usersRoutes')

//Uses
router.use('/register', registerRoutes)
router.use('/login', loginRoutes)
router.use('/users', usersRoutes)

module.exports = router