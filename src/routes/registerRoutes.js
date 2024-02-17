const express = require("express");
const router = express.Router();

//Controllers
const usersController = require("../controllers/usersController");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

///////////////////////////////////////////////////////////////////////////////////
//Register
/////////////////////////////////////////////////////////////////////////////////////
router.post(
  "/",
  usersController.checkDuplicateUsername,
  usersController.checkDuplicateEmail,
  bcryptMiddleware.hashPassword,
  usersController.createUser,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);

module.exports = router;
