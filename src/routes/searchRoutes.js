const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const tasksController = require("../controllers/tasksController")
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const searchMiddleware = require('../middlewares/searchMiddleware')

//General Search
router.get('/', jwtMiddleware.verifyToken,tasksController.searchAllUsersTasks, searchMiddleware.searchTasks)



module.exports = router;