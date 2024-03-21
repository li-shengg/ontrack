///////////////////////////////////////////////////////////////////////////////////
// Import Necessary JS files
/////////////////////////////////////////////////////////////////////////////////////
import { displayAllUserImportantTask } from "./displayTasksQuery.js";
import { createImportantTask } from "./createTaskQuery.js";
import { actionMenuDeleteTask } from "./deleteTaskQuery.js";
import { taskDetailsDeleteTask } from "./deleteTaskQuery.js";
import { taskContainerUpdateTaskImportance } from "./updateTaskImportanceQuery.js";
import { singleContainerTaskContainerUpdateTaskStatus } from "./updateTaskStatusQuery.js";
import { taskContainerUpdateTaskTitle } from "./updateTaskTitleQuery.js";
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
  displayAllUserImportantTask(userId);
  createImportantTask(token)
  actionMenuDeleteTask(token);
  taskDetailsDeleteTask(token);
  ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener for task container
  /////////////////////////////////////////////////////////////////////////////////////
  const taskList = document.querySelector(".task-list");
  taskList.addEventListener("click", (event) => {
    taskContainerUpdateTaskImportance(event, token);
    displayTaskDetails(event);
    taskContainerUpdateTaskTitle(event, token);
    singleContainerTaskContainerUpdateTaskStatus(event, token)
  });


  ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener for details header
  /////////////////////////////////////////////////////////////////////////////////////
  const detail__header = document.querySelector('.detail__header')
  detail__header.addEventListener('click', (event)=>{
    singleContainerTaskContainerUpdateTaskStatus(event, token)
  })
});
