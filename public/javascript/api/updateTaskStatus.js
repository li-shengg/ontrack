////////////////////////////////////////////////////////////////////////////////////
// Update task status (Task container)
/////////////////////////////////////////////////////////////////////////////////////
export function twoContainerTaskContainerUpdateTaskStatus(event, token) {
  const target = event.target;

  if (target.closest(".taskCompleteButton")) {
    const taskContainer = target.closest(".taskContainer");
    const taskId = taskContainer.dataset.taskId;
    //Update task status button
    const taskCompleteButton = taskContainer.querySelector(
      ".taskCompleteButton"
    );
    //Container for Completed task
    const completedTaskDisplayContainer = document.getElementById(
      "completedTaskDisplayContainer"
    );
    //Container for incomplete task
    const incompleteTaskDisplayContainer = document.getElementById(
      "incompleteTaskDisplayContainer"
    );
    const callbackForUpdateTaskStatus = (responseStatus, responseData) => {
      if (responseStatus == 200) {
        // Call displayTaskDetails again to sync SVG color
        //displayTaskDetails(event);
        if (responseData.status == "Incomplete") {
          const taskCompleteSvg = `
          <svg height="21px" width="21px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
              <path fill="#1175d3" d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"></path>
              <path fill="#1175d3" d="M745.344 361.344a32 32 0 0145.312 45.312l-288 288a32 32 0 01-45.312 0l-160-160a32 32 0 1145.312-45.312L480 626.752l265.344-265.408z" class="incompleteTaskButtonTickSvg"></path>
          </g>
          </svg>
          `;
          //If task is incomplete as the complete button is clicked, move task to the incomplete container
          incompleteTaskDisplayContainer.appendChild(taskContainer);
          //Change the svg color
          taskCompleteButton.innerHTML = taskCompleteSvg;
        } else if (responseData.status == "Completed") {
          const taskCompleteSvg = `
          <svg height="21px" width="21px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
              <circle cx="512" cy="512" r="448" fill="#1175d3"></circle>
              <path fill="#FFFFFF" d="M745.344 361.344a32 32 0 0145.312 45.312l-288 288a32 32 0 01-45.312 0l-160-160a32 32 0 1145.312-45.312L480 626.752l265.344-265.408z"></path>
          </g>
          </svg>
          `;
          //If task is completed as the complete button is clicked, move task to the completed container
          completedTaskDisplayContainer.appendChild(taskContainer);
          //Change the svg color
          taskCompleteButton.innerHTML = taskCompleteSvg;
        }

        //Check if completed task container is empty
        if (completedTaskDisplayContainer.children.length === 0) {
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

    //Query to patch task status
    fetchMethod(
      currentUrl + `/api/tasks/${taskId}/status`,
      callbackForUpdateTaskStatus,
      "PATCH",
      null,
      token
    );
  }
}



  ///////////////////////////////////////////////////////////////////////////////////
  // Update task status  by task id (Task details)
  /////////////////////////////////////////////////////////////////////////////////////
  export function taskDetailsUpdateTaskStatus(){
    const taskDetailsUpdateTaskStatusButton = document.getElementById(
        "taskDetailsUpdateTaskStatusButton"
      );
      taskDetailsUpdateTaskStatusButton.addEventListener("click", () => {
        const taskId = taskDetailsUpdateTaskStatusButton.dataset.taskId;
        const callbackForUpdateTaskStatus = (responseStatus, responseData) => {
          console.log(responseStatus);
          if (responseStatus == 200) {
            window.location.reload();
          } else {
            alert(responseData.message);
          }
        };
    
        //Fetch query to update task status
        fetchMethod(
          currentUrl + `/api/tasks/${taskId}/status`,
          callbackForUpdateTaskStatus,
          "PATCH",
          null,
          token
        );
      });
  }
  