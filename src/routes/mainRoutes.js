const express = require('express')
const router = express.Router()

//Routes
const registerRoutes = require('../routes/registerRoutes')
const loginRoutes = require('../routes/loginRoutes')

//Users
router.use('/register', registerRoutes)
router.use('/login', loginRoutes)


module.exports = router