const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

//Delete user by user id
router.delete(
  "/:userId",
  jwtMiddleware.verifyToken,
  usersController.checkUserExistsByUserId,
  usersController.deleteUserByUserId
);

module.exports = router;
