const express = require("express");
const router = express.Router();

//Controllers
const usersController = require("../controllers/usersController");
const listsController = require("../controllers/listsController");
const userListController = require("../controllers/userListController");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

///////////////////////////////////////////////////////////////////////////////////
//Register
/////////////////////////////////////////////////////////////////////////////////////
router.post(
  "/",
  usersController.validateUserRequestField,
  usersController.checkDuplicateEmail,
  bcryptMiddleware.hashPassword,
  usersController.createUser,
  listsController.createDailyList,
  userListController.createUserListRelationship,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);

module.exports = router;
