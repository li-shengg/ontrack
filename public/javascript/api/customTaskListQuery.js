///////////////////////////////////////////////////////////////////////////////////
// Import Necessary JS files
/////////////////////////////////////////////////////////////////////////////////////
import { displayTasksInCustomList } from "./displayTasksQuery.js";
import { createTaskInCustomList } from "./createTaskQuery.js";
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
  // Get list id from the url
  /////////////////////////////////////////////////////////////////////////////////////
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const listId = urlParams.get("list_id");

  ///////////////////////////////////////////////////////////////////////////////////
  // Display list name
  /////////////////////////////////////////////////////////////////////////////////////
  function displayCustomListName() {
    const callbackForDisplayCustomListName = (responseStatus, responseData) => {
      if (responseStatus == 200) {
        const customListName = document.getElementById("customListName");
        const updateCustomListNameInput = document.getElementById(
          "updateCustomListNameInput"
        );
        //Display current list name
        customListName.innerHTML = responseData.list_name;
        //Set the value of the update input to the current list name
        updateCustomListNameInput.value = responseData.list_name;
        //Set document title to the list name
        document.title = responseData.list_name;
      } else {
        alert(responseData.message);
      }
    };

    //Make query ti backend
    fetchMethod(
      currentUrl + `/api/lists/${listId}`,
      callbackForDisplayCustomListName
    );
  }

  displayCustomListName();

  ///////////////////////////////////////////////////////////////////////////////////
  // Update List Name by List Id
  /////////////////////////////////////////////////////////////////////////////////////
  const updateCustomListNameInput = document.getElementById(
    "updateCustomListNameInput"
  );
  updateCustomListNameInput.addEventListener("input", () => {
    const data = {
      list_name: updateCustomListNameInput.value,
    };

    const callbackForUpdateCustomListName = (responseStatus, responseData) => {
      if (responseStatus == 200) {
        const customListName = document.getElementById("customListName");
        const updateCustomListNameInput = document.getElementById(
          "updateCustomListNameInput"
        );
        //Display current list name
        customListName.innerHTML = responseData.list_name;
        //Set the value of the update input to the current list name
        updateCustomListNameInput.value = responseData.list_name;
      } else {
        alert(responseData.message);
      }
    };

    // Make query to update list name
    fetchMethod(
      currentUrl + `/api/lists/${listId}`,
      callbackForUpdateCustomListName,
      "PUT",
      data,
      token
    );
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Call Imported functions
  /////////////////////////////////////////////////////////////////////////////////////
  actionMenuDeleteTask(token);
  taskDetailsDeleteTask(token);
  displayTasksInCustomList(listId);
  createTaskInCustomList(listId, token);
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
