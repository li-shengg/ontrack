const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
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
module.exports = router;
