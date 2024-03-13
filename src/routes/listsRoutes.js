const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const listsController = require("../controllers/listsController");
const userListController = require("../controllers/userListController");
const taskListController = require("../controllers/taskListController");
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
//Read list by list id
router.get("/:listId", listsController.readListByListId);

//Update list by list id
router.put(
  "/:listId",
  jwtMiddleware.verifyToken,
  userListController.checkListBelongToUser,
  listsController.updateListByListId,
  listsController.readListByListId
);

//Get task under the list
router.get("/:listId/tasks", taskListController.readTasksByListId);
module.exports = router;
