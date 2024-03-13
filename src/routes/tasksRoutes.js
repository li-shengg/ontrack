const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasksController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const userListController = require("../controllers/userListController");
const taskListController = require("../controllers/taskListController");
// Create a task for the "all tasks" list
router.post(
  "/all",
  jwtMiddleware.verifyToken,
  tasksController.createNonImportantTask,
  tasksController.readTaskByTaskId
);
// Create a task for the "important" list
router.post(
  "/important",
  jwtMiddleware.verifyToken,
  tasksController.createImportantTask,
  tasksController.readTaskByTaskId
);

// Create a task for the custom list user created
router.post(
  "/lists/:listId",
  jwtMiddleware.verifyToken,
  userListController.checkListBelongToUser,
  tasksController.createNonImportantTask,
  taskListController.createTaskListRelationship,
  tasksController.readTaskByTaskId
);

// Delete task by task id
router.delete(
  "/:taskId",
  jwtMiddleware.verifyToken,
  tasksController.deleteTaskByTaskId
);

//Read task by task id
router.get("/:taskId", tasksController.readTaskByTaskId);

//Change task importance status
router.patch(
  "/:taskId/importance",
  jwtMiddleware.verifyToken,
  tasksController.checkTaskImportanceByTaskId,
  tasksController.upateTaskImportanceByTaskId,
  tasksController.readTaskByTaskId
);

//Change status of task
router.patch(
  "/:taskId/status",
  jwtMiddleware.verifyToken,
  tasksController.checkTaskStatusByTaskId,
  tasksController.updateTaskStatusByTaskId,
  tasksController.readTaskByTaskId
);

//Change task title
router.patch(
  "/:taskId/title",
  jwtMiddleware.verifyToken,
  tasksController.updateTaskTitleByTaskId,
  tasksController.readTaskByTaskId
);
module.exports = router;
