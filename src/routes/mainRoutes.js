const express = require('express')
const router = express.Router()

//Routes
const registerRoutes = require('../routes/registerRoutes')
const loginRoutes = require('../routes/loginRoutes')
const usersRoutes  =require('../routes/usersRoutes')
const listsRoutes = require('../routes/listsRoutes')
const tasksRoutes = require('../routes/tasksRoutes')
const searchRoutes = require('../routes/searchRoutes')
//Uses
router.use('/register', registerRoutes)
router.use('/login', loginRoutes)
router.use('/users', usersRoutes)
router.use('/lists', listsRoutes)
router.use('/tasks', tasksRoutes)
router.use('/search', searchRoutes)

module.exports = router