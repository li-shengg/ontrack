document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Get user info from local storage
  /////////////////////////////////////////////////////////////////////////////////////
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  ///////////////////////////////////////////////////////////////////////////////////
  // Create tasks
  /////////////////////////////////////////////////////////////////////////////////////
  const createTaskInput = document.getElementById("createTaskInput");
  createTaskInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      //If key pressed is enter
      const data = {
        task_title: createTaskInput.value,
      };

      const callbackForCreateTaskInAllTaskList = (
        responseStatus,
        responseData
      ) => {
        if (responseStatus == 201) {
          //If created successfully
          window.location.reload();
        } else {
          alert(responseData.message);
        }
      };

      //Make query to backened to create task
      fetchMethod(
        currentUrl + `/api/tasks/all`,
        callbackForCreateTaskInAllTaskList,
        "POST",
        data,
        token
      );
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Display all tasks
  /////////////////////////////////////////////////////////////////////////////////////
  const taskDisplayContainer = document.getElementById("taskDisplayContainer");
  const data = {
    user_id: userId,
  };
  const callbackForDisplayAllUserTask = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      responseData.forEach((task) => {
        let importantTaskSvgIconFill;
        if (task.is_important == "true") {
          //If task is important
          importantTaskSvgIconFill = "#1175d3";
        } else {
          importantTaskSvgIconFill = "none";
        }
        const newTask = document.createElement("li");
        newTask.setAttribute("data-task-id", task.task_id);
        newTask.classList += "taskContainer";
        newTask.innerHTML += `
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
               class ='completeTaskButtonTickSvg'
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
          viewBox="0 0 24 24"
          fill=${importantTaskSvgIconFill}
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
        taskDisplayContainer.append(newTask);
      });
    } else {
      console.log(responseData);
    }
  };
  //Make query to display all tasks
  fetchMethod(
    currentUrl + `/api/users/${userId}/tasks/all`,
    callbackForDisplayAllUserTask
  );
});

