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
    user_id: userId
  }
  const callbackForDisplayAllUserTask = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      responseData.forEach((task) => {
        const newTask = document.createElement("li");
        newTask.setAttribute('data-task-id', task.task_id)
        newTask.classList += "taskContainer";
        newTask.innerHTML += `
        <!--button to complete task-->
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
                 fill="#000000"
                 d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
               ></path>
               <path
               fill="#000000"
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
            <!--Button to mark task as important-->
           <button class="markTaskAsImportantButton">
             <svg
             height="21px"
             width="21px"
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
                 fill-rule="evenodd"
                 clip-rule="evenodd"
                 d="M5 1.25C5.41421 1.25 5.75 1.58579 5.75 2V3.08515L7.32358 2.77043C9.11678 2.41179 10.9756 2.58245 12.6735 3.26161L12.8771 3.34307C14.2919 3.90898 15.849 4.01466 17.3273 3.64509C18.5579 3.33744 19.75 4.2682 19.75 5.53669V12.9037C19.75 13.8922 19.0773 14.7538 18.1183 14.9935L17.9039 15.0471C15.9814 15.5277 13.9563 15.3903 12.1164 14.6543C10.6886 14.0832 9.12562 13.9397 7.61776 14.2413L5.75 14.6149V22C5.75 22.4142 5.41421 22.75 5 22.75C4.58579 22.75 4.25 22.4142 4.25 22V2C4.25 1.58579 4.58579 1.25 5 1.25ZM5.75 13.0851L7.32358 12.7704C9.11678 12.4118 10.9756 12.5825 12.6735 13.2616C14.2206 13.8805 15.9235 13.996 17.5401 13.5919L17.7545 13.5383C18.0457 13.4655 18.25 13.2039 18.25 12.9037V5.53669C18.25 5.24405 17.975 5.02933 17.6911 5.10031C15.9069 5.54635 14.0276 5.4188 12.32 4.73578L12.1164 4.65433C10.6886 4.08323 9.12562 3.93973 7.61776 4.2413L5.75 4.61485V13.0851Z"
                 fill="#000000"
               ></path>
             </g>
           </svg>
        </button>
        `;
        taskDisplayContainer.append(newTask)
      });
    }else{
        console.log(responseData)
    }
  };
   //Make query to display all tasks
   fetchMethod(
    currentUrl + `/api/users/${userId}/tasks/all`,
    callbackForDisplayAllUserTask,
  );
});
