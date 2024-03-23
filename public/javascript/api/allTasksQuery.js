///////////////////////////////////////////////////////////////////////////////////
// Import Necessary JS files
/////////////////////////////////////////////////////////////////////////////////////
import { displayAllUserTask } from "./displayTasksQuery.js";
import { createTaskInAllTask } from "./createTaskQuery.js";
import { actionMenuDeleteTask } from "./deleteTaskQuery.js";
import { taskDetailsDeleteTask } from "./deleteTaskQuery.js";
import { updateTaskImportance } from "./updateTaskImportanceQuery.js";
import { taskContainerUpdateTaskTitle } from "./updateTaskTitleQuery.js";
import { twoContainerTaskContainerUpdateTaskStatus } from "./updateTaskStatusQuery.js";
import { displayTaskDetails } from "./displayTaskDetailsQuery.js";

document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Get user info from local storage
  /////////////////////////////////////////////////////////////////////////////////////
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");


  ///////////////////////////////////////////////////////////////////////////////////
  // Call Imported functions
  /////////////////////////////////////////////////////////////////////////////////////
  actionMenuDeleteTask(token);
  taskDetailsDeleteTask(token);
  displayAllUserTask(userId);
  createTaskInAllTask(token)
  ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener for task container
  /////////////////////////////////////////////////////////////////////////////////////
  const taskList = document.querySelector(".task-list");
  taskList.addEventListener("click", (event) => {
    updateTaskImportance(event, token);
    displayTaskDetails(event);
    taskContainerUpdateTaskTitle(event, token);
    twoContainerTaskContainerUpdateTaskStatus(event, token);
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener for details header
  /////////////////////////////////////////////////////////////////////////////////////
  const detail__header = document.querySelector(".detail__header");
  detail__header.addEventListener("click", (event) => {
    twoContainerTaskContainerUpdateTaskStatus(event, token);
    updateTaskImportance(event, token);
  });
});
