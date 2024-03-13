const taskListModel = require("../models/taskListModel");

///////////////////////////////////////////////////////////////////////////////////
// Create new relationship
/////////////////////////////////////////////////////////////////////////////////////
module.exports.createTaskListRelationship = (req, res, next) => {
  try {
    const data = {
      taskId: res.locals.taskId,
      listId: req.params.listId,
    };

    taskListModel.insertSingleTaskListRelationship(data, (error, results) => {
      if (error) {
        console.log("Error creating new task list relationship: ", error);
        res.status(500).json({
          message: "Internal Server Error creating new task list relationship.",
        });
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////
// Read task by list id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.readTasksByListId = (req, res) => {
  try {
    const data = {
      listId: req.params.listId,
    };

    taskListModel.readTasksByListId(data, (error, results) => {
      if (error) {
        console.log("Error reading tasks by list id: ", error);
        res.status(500).json({
          message: "Internal Server Error reading tasks by list id.",
        });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
