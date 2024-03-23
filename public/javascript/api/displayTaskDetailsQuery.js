////////////////////////////////////////////////////////////////////////////////////
// Display tasks details
/////////////////////////////////////////////////////////////////////////////////////
export function displayTaskDetails(event) {
  const target = event.target;
  const taskContainer = target.closest(".taskContainer");

  //If clicked on task container and not the action buttons
  if (taskContainer && !(target.closest('.updateTaskImportanceButton') || target.closest('.updateTaskStatusButton') )) {
    //Task ID of the clicked task
    const taskId = taskContainer.dataset.taskId;
    const taskCreatedAtDisplay = document.getElementById(
      "taskCreatedAtDisplay"
    );
    const callbackForDisplayTaskDetails = (responseStatus, responseData) => {
      //Decide what color to fill when the task is important or not
      if (responseStatus === 200) {
        //Assign task ID to the delete task button
        document.querySelector(".detail__footer-delete-button").dataset.taskId =
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
            <path
            fill="#1175d3"
            d="M745.344 361.344a32 32 0 0145.312 45.312l-288 288a32 32 0 01-45.312 0l-160-160a32 32 0 1145.312-45.312L480 626.752l265.344-265.408z"
            class ='incompleteTaskButtonTickSvg'
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
        const detail__headerUpdateStatusButton = document.querySelector(
          ".detail__header-update-status-button"
        );
        detail__headerUpdateStatusButton.innerHTML = updateTaskStatusSvg;
        detail__headerUpdateStatusButton.setAttribute(
          "data-task-id",
          responseData.task_id
        );

        //Attributes for the task body
        const detail__headerTitle__text = document.querySelector(
          ".detail__header-title__text"
        );
        detail__headerTitle__text.innerText = responseData.task_title;
        const detail__headerTitle__input = document.querySelector(
          ".detail__header-title__input"
        );
        detail__headerTitle__input.setAttribute(
          "placeholder",
          responseData.task_title
        );

        //Attribute for the update task importance button
        const detail__headerUpdateImportanceButton = document.querySelector(
          ".detail__header-update-importance-button"
        );
        detail__headerUpdateImportanceButton.innerHTML = `
        <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill=${responseData.is_important === "true" ? "#1175d3" : "none"}
        viewBox="0 0 24 24"
      >
        <path
          stroke="#1175d3"
          stroke-width="1"
          d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
        />
      </svg>     
          `;
        detail__headerUpdateImportanceButton.setAttribute(
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
