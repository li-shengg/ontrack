document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Get user info from local storage
  /////////////////////////////////////////////////////////////////////////////////////
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  ///////////////////////////////////////////////////////////////////////////////////
  // Create lists
  /////////////////////////////////////////////////////////////////////////////////////
  const newListInput = document.getElementById("newListInput");
  const mainTaskAppSidebar = document.getElementById("mainTaskAppSidebar");
  newListInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      const data = {
        userId: userId,
        list_name: newListInput.value,
      };

      const callbackForCreateNewList = (responseStatus, responseData) => {
        if (responseStatus == 201) {
          //If create successfully
          window.location.reload();
        } else {
          //If there is an error
          alert(responseData.message);
        }
      };

      //Make query to backend to create new lists
      fetchMethod(
        currentUrl + `/api/lists`,
        callbackForCreateNewList,
        "POST",
        data,
        token
      );
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Display list by user id
  /////////////////////////////////////////////////////////////////////////////////////
  const createdListTabsContainer = document.getElementById(
    "createdListTabsContainer"
  );
  const callbackForDisplayAllUserLists = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      responseData.forEach((list) => {
        const newList = document.createElement("li");
        //Add list id into data
        newList.innerHTML += `
            <a href="#" data-list-id = ${list.list_id} class = 'createdList'>
               <svg
                 width="24px"
                 height="24px"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                 <g
                   id="SVGRepo_tracerCarrier"
                   stroke-linecap="round"
                   stroke-linejoin="round"
                 ></g>
                 <g id="SVGRepo_iconCarrier">
                   <path
                     d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                     stroke="#000000"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                   ></path>
                 </g>
               </svg>
               ${list.list_name}
            </a>

            `;
        //Appen new list to container
        createdListTabsContainer.append(newList);
      });
    } else {
      alert(responseData.message);
    }
  };

  //Make query to backend
  fetchMethod(
    currentUrl + `/api/users/${userId}/lists`,
    callbackForDisplayAllUserLists
  );

  ///////////////////////////////////////////////////////////////////////////////////
  // Delete list by list id
  /////////////////////////////////////////////////////////////////////////////////////
  const deleteListButton = document.getElementById("deleteListButton");
  deleteListButton.addEventListener("click", () => {
    //Get the list ID
    const listId = deleteListButton.dataset.listId;
    const callbackForDeleteList = (responseStatus, responseData) => {
      if (responseStatus == 204) {
        //If delete successfully
        window.location.reload();
      } else {
        //If error
        alert(responseData.message);
      }
    };

    //Make query to backend to delete
    fetchMethod(
      currentUrl + `/api/lists/${listId}`,
      callbackForDeleteList,
      "DELETE",
      null,
      token
    );
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Delete task by task id (Delete context menu)
  /////////////////////////////////////////////////////////////////////////////////////
  const deleteTaskButton = document.getElementById("deleteTaskButton");
  deleteTaskButton.addEventListener("click", () => {
    //Get the task id
    const taskId = deleteTaskButton.dataset.taskId;

    const callbackForDeleteTask = (responseStatus, responseData) => {
      if (responseStatus == 204) {
        //If delete is successful
        window.location.reload();
      } else {
        //If there is error deleting
        alert(responseData.message);
      }
    };

    //Make query to delete task
    fetchMethod(
      currentUrl + `/api/tasks/${taskId}`,
      callbackForDeleteTask,
      "DELETE",
      null,
      token
    );
  });

  ////////////////////////////////////////////////////////////////////////////////////
  // Display tasks details
  /////////////////////////////////////////////////////////////////////////////////////
  function displayTaskDetails(event) {
    const target = event.target;
    const taskContainer = target.closest(".taskContainer");
    if (taskContainer) {
      const taskDetailsHeader = document.getElementById("taskDetailsHeader");
      const taskCreatedAtDisplay = document.getElementById(
        "taskCreatedAtDisplay"
      );
      //Task ID of the clicked task
      const taskId = taskContainer.dataset.taskId;
      const callbackForDisplayTaskDetails = (responseStatus, responseData) => {
        //Decide what color to fill when the task is important or not
        if (responseStatus === 200) {
          let importantTaskSvgIconFill;
          if (responseData.is_important == "true") {
            //If task is important
            importantTaskSvgIconFill = "#1175d3";
          } else {
            importantTaskSvgIconFill = "none";
          }
          //Assign task ID to the delete task button
          document.getElementById(
            "taskDetailsDeleteTaskButton"
          ).dataset.taskId = taskContainer.dataset.taskId;
          //Display task title
          taskDetailsHeader.innerHTML = `
          <button id="taskDetailsMarkTaskAsCompleteButton" data-task-id = ${responseData.task_id}>
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
              </g>
            </svg>
          </button>
          <!--Task Body-->
          <div id="taskDetailsTaskBody">
            <span id="taskDetailsTaskBodyTitle">${responseData.task_title}</span>
            <input
              type="text"
              id="taskDetailsUpdateTaskTitleInput"
              placeholder="${responseData.task_title}"
            />
          </div>
          <!--Button to mark task as important-->
          <button id="taskDetailsMarkTaskAsImportantButton" data-task-id = ${responseData.task_id}>
          <svg
          viewBox="0 0 24 24"
          fill = ${importantTaskSvgIconFill}
          width="21px"
          height="21px"
          xmlns="http://www.w3.org/2000/svg"
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
          //Display date whereby task is created
          taskCreatedAtDisplay.innerText = responseData.created_at;
        } else {
          //If error
          alert(responseData.message);
        }
      };

      //Make query to display task details
      fetchMethod(
        currentUrl + `/api/tasks/${taskId}`,
        callbackForDisplayTaskDetails
      );
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////
  // Update task importance (Task container)
  /////////////////////////////////////////////////////////////////////////////////////
  function updateTaskImportantStatus(event) {
    const target = event.target;
    const taskContainer = target.closest(".taskContainer");
    console.log(target.classList);
    if (taskContainer) {
      //Task ID of the clicked task
      const taskId = taskContainer.dataset.taskId;

      //Mark as important button of the clicked task container
      const markTaskAsImportantButton = taskContainer.querySelector(
        ".markTaskAsImportantButton"
      );

      //Event listener to update task status
      markTaskAsImportantButton.addEventListener("click", () => {
        const callbackForUpdateTaskImportantStatus = (
          responseStatus,
          responseData
        ) => {
          console.log(responseData);
          if (responseStatus == 200) {
            window.location.reload();
          } else {
            alert(responseData.message);
          }
        };

        fetchMethod(
          currentUrl + `/api/tasks/${taskId}/importance`,
          callbackForUpdateTaskImportantStatus,
          "PATCH",
          null,
          token
        );
      });
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  // Event listener for task display container
  /////////////////////////////////////////////////////////////////////////////////////
  const taskDisplayContainer = document.getElementById("taskDisplayContainer");
  taskDisplayContainer.addEventListener("click", (event) => {
    updateTaskImportantStatus(event);
    displayTaskDetails(event);
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Delete task by task id (Task details delete button)
  /////////////////////////////////////////////////////////////////////////////////////
  const taskDetailsDeleteTaskButton = document.getElementById(
    "taskDetailsDeleteTaskButton"
  );
  taskDetailsDeleteTaskButton.addEventListener("click", () => {
    const taskId = taskDetailsDeleteTaskButton.dataset.taskId;
    const callbackForDeleteTask = (responseStatus, responseData) => {
      if (responseStatus == 204) {
        window.location.reload();
      } else {
        alert(responseData.message);
      }
    };

    //Fetch query to delete
    fetchMethod(
      currentUrl + `/api/tasks/${taskId}`,
      callbackForDeleteTask,
      "DELETE",
      null,
      token
    );
  });
});
