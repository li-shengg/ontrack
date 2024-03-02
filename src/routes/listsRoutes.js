const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const listsController = require("../controllers/listsController");
const userListController = require("../controllers/userListController");

//Create new list
router.post(
  "/",
  jwtMiddleware.verifyToken,
  listsController.createNewList,
  userListController.createUserListRelationship,
  listsController.readListByListId
);
//Delete list by id
router.delete(
  "/:listId",
  jwtMiddleware.verifyToken,
  userListController.checkListBelongToUser,
  listsController.deleteListByListId
);

module.exports = router;
