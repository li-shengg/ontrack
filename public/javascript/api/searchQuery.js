import { displayTaskSearchResult } from "./displayTasksQuery.js";
import { displayTaskDetails } from "./displayTaskDetailsQuery.js";
import { actionMenuDeleteTask } from "./deleteTaskQuery.js";
import { updateTaskImportance } from "./updateTaskImportanceQuery.js";
import { updateTaskStatus } from "./updateTaskStatusQuery.js";

document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Get user info from local storage
  /////////////////////////////////////////////////////////////////////////////////////
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  ///////////////////////////////////////////////////////////////////////////////////
  // Call Imported functions
  /////////////////////////////////////////////////////////////////////////////////////
  displayTaskSearchResult(token);
  actionMenuDeleteTask(token);

  ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener for task container
  /////////////////////////////////////////////////////////////////////////////////////
  const taskList = document.querySelector(".task-list");
  taskList.addEventListener('click', (event)=>{
    displayTaskDetails(event)
    updateTaskImportance(event, token);
    updateTaskStatus(event, token);
  })


  ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener for details header
  /////////////////////////////////////////////////////////////////////////////////////
  const detail__header = document.querySelector('.detail__header')
  detail__header.addEventListener('click', (event)=>{
    updateTaskStatus(event, token);
    updateTaskImportance(event, token);
  })
});
