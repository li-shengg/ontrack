const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const listsController = require("../controllers/listsController");
const { deleteListByListId } = require("../models/listsModel");

//Create new list
router.post("/", jwtMiddleware.verifyToken, listsController.createNewList);
//Delete list by id
router.delete("/:listId", jwtMiddleware.verifyToken, listsController.checkListBelongToUser, deleteListByListId)


module.exports = router;
