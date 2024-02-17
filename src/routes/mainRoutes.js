const express = require('express')
const router = express.Router()

//Routes
const registerRoutes = require('../routes/registerRoutes')


//Users
router.use('/register', registerRoutes)


module.exports = router