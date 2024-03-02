const express = require('express')
const router = express.Router()

const tasksController = require('../controllers/tasksController')
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// Create a task for the "all tasks" list
router.post('/all', jwtMiddleware.verifyToken, tasksController.createNonImportantTask, tasksController.readTaskByTaskId)

// Delete task by task id
router.delete('/:taskId', jwtMiddleware.verifyToken, tasksController.deleteTaskByTaskId)


module.exports = router