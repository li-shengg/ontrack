///////////////////////////////////////////////////////////////////////////////////
// Import Necessary JS files
/////////////////////////////////////////////////////////////////////////////////////
import { actionMenuDeleteTask } from "./deleteTaskQuery.js";
import { taskDetailsDeleteTask } from "./deleteTaskQuery.js";
import { taskContainerUpdateTaskImportance } from "./updateTaskImportanceQuery.js";
import { taskContainerUpdateTaskTitle } from "./updateTaskTitleQuery.js";
import { twoContainerTaskContainerUpdateTaskStatus } from "./updateTaskStatus.js";
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
  // Create new task under list
  /////////////////////////////////////////////////////////////////////////////////////
  const createTaskInCustomListInput = document.getElementById(
    "createTaskInCustomListInput"
  );
  createTaskInCustomListInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      const data = {
        task_title: createTaskInCustomListInput.value,
      };

      const callbackForCreateTaskInCustomList = (
        responseStatus,
        responseData
      ) => {
        if (responseStatus == 201) {
          const incompleteTaskDisplayContainer = document.getElementById(
            "incompleteTaskDisplayContainer"
          );
          incompleteTaskDisplayContainer.innerHTML += `
          <li class='taskContainer' data-task-id='${responseData.task_id}'>
            <button class="taskCompleteButton">
              <svg height="21px" width="21px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill="#1175d3" d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"></path>
                  <path fill="#1175d3" d="M745.344 361.344a32 32 0 0145.312 45.312l-288 288a32 32 0 01-45.312 0l-160-160a32 32 0 1145.312-45.312L480 626.752l265.344-265.408z" class ='incompleteTaskButtonTickSvg'></path>
                </g>
              </svg>
            </button>
            <!--Task Body-->
            <div class="taskBody" data-task-id='${responseData.task_id}'>
              <span class="taskBodyTitle">${responseData.task_title}</span>
              <input type="text" class="updateTaskTitleInput" placeholder="${responseData.task_title}">
            </div>
            
            <button class="markTaskAsImportantButton">
              <svg viewBox="0 0 24 24" fill='none' width="21px" height="21px" xmlns="http://www.w3.org/2000/svg" class="markTaskAsImportantSvg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#1175d3" stroke-width="1.5"></path>
                </g>
              </svg>
            </button>
          </li>
          `;
          createTaskInCustomListInput.value = "";
        } else {
          alert(responseData.message);
        }
      };

      //Query to backend
      fetchMethod(
        currentUrl + `/api/tasks/lists/${listId}`,
        callbackForCreateTaskInCustomList,
        "POST",
        data,
        token
      );
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Display task in lists
  /////////////////////////////////////////////////////////////////////////////////////
  function displayTasksInCustomList() {
    const incompleteTaskDisplayContainer = document.getElementById(
      "incompleteTaskDisplayContainer"
    );
    const completedTaskDisplayContainer = document.getElementById(
      "completedTaskDisplayContainer"
    );
    const callbackForDisplayTasksInCusomList = (
      responseStatus,
      responseData
    ) => {
      if (responseStatus == 200) {
        responseData.forEach((task) => {
          //If task is incomplete
          if (task.status == "Incomplete") {
            const incompleteTask = document.createElement("li");
            incompleteTask.setAttribute("data-task-id", task.task_id);
            incompleteTask.classList += "taskContainer";
            incompleteTask.innerHTML += `
                <button class="taskCompleteButton">
                  <svg
                  height="21px"
                  width="21px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#1175d3"
                      d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
                    ></path>
                    <path
                    fill="#1175d3"
                    d="M745.344 361.344a32 32 0 0145.312 45.312l-288 288a32 32 0 01-45.312 0l-160-160a32 32 0 1145.312-45.312L480 626.752l265.344-265.408z"
                    class ='incompleteTaskButtonTickSvg'
                    ></path>
                  </g>
                </svg>
                </button>
                 <!--Task Body-->
                <div class="taskBody" data-task-id = ${task.task_id}>
                  <span class="taskBodyTitle">${task.task_title}</span>
                  <input type="text" class = "updateTaskTitleInput" placeholder = "${
                    task.task_title
                  }">
                </div>
                
             <button class="markTaskAsImportantButton">
               <svg
               viewBox="0 0 24 24"
               fill=${task.is_important === "true" ? "#1175d3" : "none"}
               width="21px"
               height="21px"
               xmlns="http://www.w3.org/2000/svg"
               class="markTaskAsImportantSvg"
               >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  
                  <path
                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                    stroke="#1175d3"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>
             </button>
          `;
            incompleteTaskDisplayContainer.append(incompleteTask);
          } else if (task.status == "Completed") {
            //If task is completed
            const completedTask = document.createElement("li");
            completedTask.setAttribute("data-task-id", task.task_id);
            completedTask.classList += "taskContainer";
            completedTask.innerHTML += `
                <button class="taskCompleteButton">
                  <svg
                  height="21px"
                  width="21px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <circle cx="512" cy="512" r="448" fill="#1175d3"></circle>
                    <path
                    fill="#FFFFFF"
                    d="M745.344 361.344a32 32 0 0145.312 45.312l-288 288a32 32 0 01-45.312 0l-160-160a32 32 0 1145.312-45.312L480 626.752l265.344-265.408z"
                    ></path>
                  </g>
                </svg>
                </button>
                 <!--Task Body-->
                <div class="taskBody" data-task-id = ${task.task_id}>
                  <span class="taskBodyTitle">${task.task_title}</span>
                  <input type="text" class = "updateTaskTitleInput" placeholder = "${
                    task.task_title
                  }">
                </div>
                
             <button class="markTaskAsImportantButton">
               <svg
               viewBox="0 0 24 24"
               fill=${task.is_important === "true" ? "#1175d3" : "none"}
               width="21px"
               height="21px"
               xmlns="http://www.w3.org/2000/svg"
               class="markTaskAsImportantSvg"
               >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  
                  <path
                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                    stroke="#1175d3"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>
             </button>
          `;
            completedTaskDisplayContainer.append(completedTask);
          }
        });

        //Deciding to display completed task or not
        if (completedTaskDisplayContainer.children.length == 0) {
          document.getElementById("completedTasksSection").style.display =
            "none";
        } else {
          document.getElementById("completedTasksSection").style.display =
            "block";
        }
      } else {
        alert(responseData.message);
      }
    };

    //Query to backend
    fetchMethod(
      currentUrl + `/api/lists/${listId}/tasks`,
      callbackForDisplayTasksInCusomList
    );
  }

  displayTasksInCustomList();

  ///////////////////////////////////////////////////////////////////////////////////
  // Call Imported functions
  /////////////////////////////////////////////////////////////////////////////////////
  actionMenuDeleteTask(token);
  taskDetailsDeleteTask(token);
  ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener for task container
  /////////////////////////////////////////////////////////////////////////////////////
  const taskDisplayContainer = document.getElementById("taskDisplayContainer");
  taskDisplayContainer.addEventListener("click", (event) => {
    taskContainerUpdateTaskImportance(event, token);
    displayTaskDetails(event);
    taskContainerUpdateTaskTitle(event, token);
    twoContainerTaskContainerUpdateTaskStatus(event, token);
  });
});
