////////////////////////////////////////////////////////////////////////////////////
// Display tasks details
/////////////////////////////////////////////////////////////////////////////////////
export function displayTaskDetails(event) {
  const target = event.target;
  const taskContainer = target.closest(".taskContainer");
  if (taskContainer) {
    //Task ID of the clicked task
    const taskId = taskContainer.dataset.taskId;
    const taskCreatedAtDisplay = document.getElementById(
      "taskCreatedAtDisplay"
    );
    const callbackForDisplayTaskDetails = (responseStatus, responseData) => {
      //Decide what color to fill when the task is important or not
      if (responseStatus === 200) {
        //Assign task ID to the delete task button
        document.getElementById("taskDetailsDeleteTaskButton").dataset.taskId =
          taskContainer.dataset.taskId;

        //Display style of the update task status button
        let updateTaskStatusSvg;
        if (responseData.status == "Incomplete") {
          //If task is incomplete
          updateTaskStatusSvg = `
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
             `;
        } else if (responseData.status == "Completed") {
          updateTaskStatusSvg = `
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
            `;
        }
        //Attribites for the update task status button
        const taskDetailsUpdateTaskStatusButton = document.getElementById(
          "taskDetailsUpdateTaskStatusButton"
        );
        taskDetailsUpdateTaskStatusButton.innerHTML = updateTaskStatusSvg;
        taskDetailsUpdateTaskStatusButton.setAttribute(
          "data-task-id",
          responseData.task_id
        );

        //Attributes for the task body
        const taskDetailsTaskBodyTitle = document.getElementById(
          "taskDetailsTaskBodyTitle"
        );
        taskDetailsTaskBodyTitle.innerText = responseData.task_title;
        const taskDetailsUpdateTaskTitleInput = document.getElementById(
          "taskDetailsUpdateTaskTitleInput"
        );
        taskDetailsUpdateTaskTitleInput.setAttribute(
          "placeholder",
          responseData.task_title
        );

        //Attribute for the update task importance button
        const taskDetailsUpdateTaskImportanceButton = document.getElementById(
          "taskDetailsUpdateTaskImportanceButton"
        );
        taskDetailsUpdateTaskImportanceButton.innerHTML = `
          <svg
          viewBox="0 0 24 24"
          fill = ${responseData.is_important === "true" ? "#1175d3" : "none"}
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
          `;
        taskDetailsUpdateTaskImportanceButton.setAttribute(
          "data-task-id",
          responseData.task_id
        );
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
