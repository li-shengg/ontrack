const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const listsController = require("../controllers/listsController");
const userListController = require("../controllers/userListController");
const tasksController = require('../controllers/tasksController')
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");

//Delete user by user id
router.delete(
  "/:userId",
  jwtMiddleware.verifyToken,
  usersController.checkUserExistsByUserId,
  usersController.deleteUserByUserId
);

//Update user details
router.put(
  "/:userId",
  jwtMiddleware.verifyToken,
  usersController.checkUserExistsByUserId,
  usersController.checkDuplicateEmail,
  usersController.updateUserDetailsByUserId
);

//Update user password
router.put(
  "/:userId/password",
  jwtMiddleware.verifyToken,
  usersController.checkUserExistsByUserId,
  usersController.obtainCurrentUserPassword,
  bcryptMiddleware.comparePassword,
  bcryptMiddleware.hashPassword,
  usersController.updateUserPasswordByUserId
);


//Read user credentials
router.get('/:userId/credentials',   usersController.checkUserExistsByUserId, usersController.readUserCredentialsByUserId)

//Read user lists
router.get(
  "/:userId/lists",
  usersController.checkUserExistsByUserId,
  userListController.readCustomListByUserId
);

//Read all user tasks
router.get(
  "/:userId/tasks/all",
  tasksController.readTasksByUserId
)
//Read all user important tasks
router.get(
  "/:userId/tasks/important",
  tasksController.readImportantTasksByUserId
)

module.exports = router;
