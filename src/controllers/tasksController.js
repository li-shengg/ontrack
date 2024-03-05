const tasksModel = require("../models/tasksModel");

///////////////////////////////////////////////////////////////////////////////////
// Create non important task
/////////////////////////////////////////////////////////////////////////////////////
module.exports.createNonImportantTask = (req, res, next) => {
  try {
    const data = {
      userId: res.locals.userId,
      taskTitle: req.body.task_title,
      isImportant: "false",
      status: "Incomplete",
    };

    tasksModel.insertSingleTask(data, (error, results) => {
      if (error) {
        console.log("Error creating new task: ", error);
        res.status(500).json({
          message: "Internal Server Error creating new task.",
        });
      } else {
        res.locals.taskId = results.insertId;
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
// Read task by id task id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.readTaskByTaskId = (req, res) => {
  try {
    const data = {
      taskId:req.params.taskId || res.locals.taskId,
    };

    tasksModel.readTaskByTaskId(data, (error, results) => {
      if (error) {
        console.log("Error reading task by task id: ", error);
        res.status(500).json({
          message: "Internal Server Error reading task by task id.",
        });
      } else {
        const status = req.method === "POST" ? 201 : 200;
        res.status(status).json(results[0]);
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
// Read task by user id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.readTasksByUserId = (req, res) => {
  try {
    const data = {
      userId: req.params.userId,
    };
    tasksModel.readTaskByUserId(data, (error, results) => {
      if (error) {
        console.log("Error reading task by user id: ", error);
        res.status(500).json({
          message: "Internal Server Error reading task by user id.",
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

///////////////////////////////////////////////////////////////////////////////////
// Delete task by task id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.deleteTaskByTaskId = (req, res) => {
  try {
    const data = {
      taskId: req.params.taskId,
    };
    tasksModel.deleteTaskByTaskId(data, (error, results) => {
      if (error) {
        console.log("Error deleting task by task id: ", error);
        res.status(500).json({
          message: "Internal Server Error deleting task by task id.",
        });
      } else {
        //Upon successful deletion
        res.status(204).send();
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
// Check task important status by task id
/////////////////////////////////////////////////////////////////////////////////////
module.exports.checkTaskImportantStatusByTaskId = (req,res,next) =>{
  try{
    const data = {
      taskId: req.params.taskId
    }

    tasksModel.readTaskByTaskId(data, (error,results)=>{
      if(error){
        console.log("Error reading task by task id: ", error);
        res.status(500).json({
          message: "Internal Server Error reading task by task id.",
        });
      }else{
        if(results[0].is_important == 'false'){
          //If task is originally not important
          res.locals.isImportant = 'true'
          next()
        }else if(results[0].is_important == 'true'){
          //If task is originally important
          res.locals.isImportant = 'false'
          next()
        }
      }
    })
  }catch(error){
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

///////////////////////////////////////////////////////////////////////////////////
// Update task important status
/////////////////////////////////////////////////////////////////////////////////////
module.exports.upateTaskImportantStatusByTaskId = (req,res,next) =>{
  try{
    const data = {
      taskId: req.params.taskId,
      isImportant: res.locals.isImportant
    }

    tasksModel.upateTaskImportantStatusByTaskId(data, (error,results)=>{
      if(error){
        console.log("Error updating task important status by task id: ", error);
        res.status(500).json({
          message: "Internal Server Error updating task important status by task id.",
        });
      }else{
        //If update is successful
        next()
      }
    })
  }catch(error){
    console.log("Internal Server Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
