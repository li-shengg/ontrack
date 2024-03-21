///////////////////////////////////////////////////////////////////////////////////
// Display all tasks
/////////////////////////////////////////////////////////////////////////////////////
export function displayAllUserTask(userId) {
  const taskList__incomplete = document.querySelector(".task-list__incomplete");
  const taskList__completed = document.querySelector(".task-list__completed");
  const callbackForDisplayAllUserTask = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      responseData.forEach((task) => {
        //If task is incomplete
        if (task.status == "Incomplete") {
          const incompleteTask = document.createElement("li");
          incompleteTask.setAttribute("data-task-id", task.task_id);
          incompleteTask.classList += "taskContainer";
          incompleteTask.innerHTML += `
                <button class="updateTaskStatusButton" data-task-id='${
                  task.task_id
                }'>
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
                 class="w-6 h-6 text-gray-800 dark:text-white markTaskAsImportantSvg"
                 aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 fill=${task.is_important === "true" ? "#1175d3" : "none"}
                 viewBox="0 0 24 24"
               >
                 <path
                   stroke=${task.is_important === "true" ? "#1175d3" : "black"}
                   stroke-width="1"
                   d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                 />
               </svg>     
             </button>
          `;
          taskList__incomplete.append(incompleteTask);
        } else if (task.status == "Completed") {
          //If task is completed
          const completedTask = document.createElement("li");
          completedTask.setAttribute("data-task-id", task.task_id);
          completedTask.classList += "taskContainer";
          completedTask.innerHTML += `
                <button class="updateTaskStatusButton" data-task-id='${
                  task.task_id
                }'>
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
                 class="w-6 h-6 text-gray-800 dark:text-white markTaskAsImportantSvg"
                 aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 fill=${task.is_important === "true" ? "#1175d3" : "none"}
                 viewBox="0 0 24 24"
               >
                 <path
                   stroke=${task.is_important === "true" ? "#1175d3" : "black"}
                   stroke-width="1"
                   d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                 />
               </svg>     
             </button>
          `;
          taskList__completed.append(completedTask);
        }
      });

      //Deciding to display completed task or not
      if (taskList__completed.children.length == 0) {
        document.querySelector(
          ".task-list__completed-container"
        ).style.display = "none";
      } else {
        document.querySelector(
          ".task-list__completed-container"
        ).style.display = "block";
      }
    } else {
      console.log(responseData);
    }
  };
  //Make query to display all tasks
  fetchMethod(
    currentUrl + `/api/users/${userId}/tasks/all`,
    callbackForDisplayAllUserTask
  );
}

///////////////////////////////////////////////////////////////////////////////////
// Display task in lists
/////////////////////////////////////////////////////////////////////////////////////
export function displayTasksInCustomList(listId) {
  const taskList__incomplete = document.querySelector(".task-list__incomplete");
  const taskList__completed = document.querySelector(".task-list__completed");
  const callbackForDisplayTasksInCusomList = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      responseData.forEach((task) => {
        //If task is incomplete
        if (task.status == "Incomplete") {
          const incompleteTask = document.createElement("li");
          incompleteTask.setAttribute("data-task-id", task.task_id);
          incompleteTask.classList += "taskContainer";
          incompleteTask.innerHTML += `
                <button class="updateTaskStatusButton" data-task-id='${
                  task.task_id
                }'>
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
             class="w-6 h-6 text-gray-800 dark:text-white markTaskAsImportantSvg"
             aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             fill=${task.is_important === "true" ? "#1175d3" : "none"}
             viewBox="0 0 24 24"
           >
             <path
               stroke=${task.is_important === "true" ? "#1175d3" : "black"}
               stroke-width="1"
               d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
             />
           </svg>     
             </button>
          `;
          taskList__incomplete.append(incompleteTask);
        } else if (task.status == "Completed") {
          //If task is completed
          const completedTask = document.createElement("li");
          completedTask.setAttribute("data-task-id", task.task_id);
          completedTask.classList += "taskContainer";
          completedTask.innerHTML += `
                <button class="updateTaskStatusButton"  data-task-id='${
                  task.task_id
                }'>
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
             class="w-6 h-6 text-gray-800 dark:text-white markTaskAsImportantSvg"
             aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             fill=${task.is_important === "true" ? "#1175d3" : "none"}
             viewBox="0 0 24 24"
           >
             <path
               stroke=${task.is_important === "true" ? "#1175d3" : "black"}
               stroke-width="1"
               d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
             />
           </svg>     
             </button>
          `;
          taskList__completed.append(completedTask);
        }
      });

      //Deciding to display completed task or not
      if (taskList__completed.children.length == 0) {
        document.querySelector(
          ".task-list__completed-container"
        ).style.display = "none";
      } else {
        document.querySelector(
          ".task-list__completed-container"
        ).style.display = "block";
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

///////////////////////////////////////////////////////////////////////////////////
// Display important tasks
/////////////////////////////////////////////////////////////////////////////////////
export function displayAllUserImportantTask(userId) {
  const taskList__incomplete = document.querySelector(".task-list__incomplete");

  const callbackForDisplayAllUserImportantTask = (
    responseStatus,
    responseData
  ) => {
    if (responseStatus == 200) {
      responseData.forEach((task) => {
        if (task.status == "Incomplete") {
          const incompleteTask = document.createElement("li");
          incompleteTask.setAttribute("data-task-id", task.task_id);
          incompleteTask.classList += "taskContainer";
          incompleteTask.innerHTML += `
            <button class="updateTaskStatusButton"  data-task-id='${task.task_id}'>
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
              <input type="text" class = "updateTaskTitleInput" placeholder = "${task.task_title}">
            </div>
            
            <button class="markTaskAsImportantButton">
            <svg
            class="w-6 h-6 text-gray-800 dark:text-white markTaskAsImportantSvg"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#1175d3"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#1175d3"
              stroke-width="1"
              d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
            />
          </svg>     
            </button>
            `;
          taskList__incomplete.append(incompleteTask);
        }
      });
    }
  };

  //Make query to backend to display task
  fetchMethod(
    currentUrl + `/api/users/${userId}/tasks/important`,
    callbackForDisplayAllUserImportantTask
  );
}


///////////////////////////////////////////////////////////////////////////////////
// Display Task Search Result
/////////////////////////////////////////////////////////////////////////////////////
export function displayTaskSearchResult(token){
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const callbackForSearchUserTasks = (responseStatus, responseData) => {
      const taskList__tasks = document.querySelector(
        ".task-list__tasks"
      );

      //Reset the display from the previous search
      taskList__tasks.innerHTML = ''
      if (responseStatus == 200) {
        responseData.forEach((task) => {
          //If task is incomplete
          if (task.status == "Incomplete") {
            const incompleteTask = document.createElement("li");
            incompleteTask.setAttribute("data-task-id", task.task_id);
            incompleteTask.classList += "taskContainer";
            incompleteTask.innerHTML += `
                <button class="updateTaskStatusButton"  data-task-id='${task.task_id}'>
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
             class="w-6 h-6 text-gray-800 dark:text-white markTaskAsImportantSvg"
             aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             fill=${task.is_important === "true" ? "#1175d3" : "none"}
             viewBox="0 0 24 24"
           >
             <path
               stroke=${task.is_important === "true" ? "#1175d3" : "black"}
               stroke-width="1"
               d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
             />
           </svg>     
             </button>
          `;
          taskList__tasks.append(incompleteTask);
          } else if (task.status == "Completed") {
            //If task is completed
            const completedTask = document.createElement("li");
            completedTask.setAttribute("data-task-id", task.task_id);
            completedTask.classList += "taskContainer";
            completedTask.innerHTML += `
                <button class="updateTaskStatusButton"  data-task-id='${task.task_id}'>
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
             class="w-6 h-6 text-gray-800 dark:text-white markTaskAsImportantSvg"
             aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             fill=${task.is_important === "true" ? "#1175d3" : "none"}
             viewBox="0 0 24 24"
           >
             <path
               stroke=${task.is_important === "true" ? "#1175d3" : "black"}
               stroke-width="1"
               d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
             />
           </svg>     
             </button>
          `;
          taskList__tasks.append(completedTask);
          }
        });
      } else {
        alert(responseData.message);
      }
    };

    //Make query to backend
    fetchMethod(
      currentUrl + `/api/search?q=${searchInput.value}`,
      callbackForSearchUserTasks,
      "GET",
      null,
      token
    );
  });
}
