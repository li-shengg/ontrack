const express = require("express");
const router = express.Router();

//Controllers
const usersController = require("../controllers/usersController");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post(
  "/",
  usersController.checkUserExistsByEmail,
  usersController.loginByEmail,
  bcryptMiddleware.comparePassword,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);

module.exports = router;
