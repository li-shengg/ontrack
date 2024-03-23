////////////////////////////////////////////////////////////////////////////////////
// Update task importance
/////////////////////////////////////////////////////////////////////////////////////
export function updateTaskImportance(event, token) {
  const target = event.target;
  const updateTaskImportanceButton = target.closest(
    ".updateTaskImportanceButton"
  );
  // Check if the clicked element has the class "markTaskAsImportantButton"
  if (updateTaskImportanceButton) {
    const taskId = updateTaskImportanceButton.dataset.taskId;

    const callbackForUpdateTaskImportance = (responseStatus, responseData) => {
      if (responseStatus == 200) {
        //Determine which task container is being updated
        const allTaskContainer = document.querySelectorAll(".taskContainer");
        let currentTaskContainer;
        allTaskContainer.forEach((taskContainer) => {
          if (taskContainer.dataset.taskId == taskId) {
            currentTaskContainer = taskContainer;
          }
        });

        //Detail header update importance button
        const detail__headerUpdateImportanceButton = document.querySelector(
          ".detail__header-update-importance-button"
        );

        //Task container update importance SVG
        let taskContainerImportanceSvg = currentTaskContainer.querySelector(
          ".updateTaskImportanceButton svg"
        );
        if (responseData.is_important === "true") {
          //Check If the detail container is displaying the current task
          if (detail__headerUpdateImportanceButton.dataset.taskId == taskId) {
            detail__headerUpdateImportanceButton
              .querySelector("svg")
              .setAttribute("fill", "#1175d3");
          }
          taskContainerImportanceSvg.setAttribute("fill", "#1175d3");
        } else if (responseData.is_important === "false") {
          //Check If the detail container is displaying the current task
          if (detail__headerUpdateImportanceButton.dataset.taskId == taskId) {
            detail__headerUpdateImportanceButton
              .querySelector("svg")
              .setAttribute("fill", "none");
          }
          taskContainerImportanceSvg.setAttribute("fill", "none");
        }
      } else {
        alert(responseData.message);
      }
    };

    fetchMethod(
      currentUrl + `/api/tasks/${taskId}/importance`,
      callbackForUpdateTaskImportance,
      "PATCH",
      null,
      token
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////
// Important Page Update Task Importance
/////////////////////////////////////////////////////////////////////////////////////
export function importantPageUpdateTaskImportance(event, token) {
  const target = event.target;
  const updateTaskImportanceButton = target.closest(
    ".updateTaskImportanceButton"
  );

  if (updateTaskImportanceButton) {
    const taskId = updateTaskImportanceButton.dataset.taskId;
    const callbackForUpdateTaskImportance = (responseStatus, responseData) => {
      if (responseStatus == 200) {
        //Container for incomplete task
        const taskList__incomplete = document.querySelector(
          ".task-list__incomplete"
        );
        //Determine which task container is being updated
        const allTaskContainer = document.querySelectorAll(".taskContainer");
        let currentTaskContainer;
        allTaskContainer.forEach((taskContainer) => {
          if (taskContainer.dataset.taskId == taskId) {
            currentTaskContainer = taskContainer;
          }
        });

        //Detail header update importance button
        const detail__headerUpdateImportanceButton = document.querySelector(
          ".detail__header-update-importance-button"
        );

        //Task container update importance SVG
        let taskContainerImportanceSvg = currentTaskContainer.querySelector(
          ".updateTaskImportanceButton svg"
        );

        if (responseData.is_important === "false") {
          //Check If the detail container is displaying the current task
          if (detail__headerUpdateImportanceButton.dataset.taskId == taskId) {
            detail__headerUpdateImportanceButton
              .querySelector("svg")
              .setAttribute("fill", "none");
          }
          taskContainerImportanceSvg.setAttribute("fill", "none");
          //Remove the task container from the page
          taskList__incomplete.removeChild(currentTaskContainer);
        } else if (responseData.is_important === "true") {
          //Check If the detail container is displaying the current task
          if (detail__headerUpdateImportanceButton.dataset.taskId == taskId) {
            detail__headerUpdateImportanceButton
              .querySelector("svg")
              .setAttribute("fill", "#1175d3");
          }
          taskContainerImportanceSvg.setAttribute("fill", "#1175d3");
        }
      }
    };

    fetchMethod(
      currentUrl + `/api/tasks/${taskId}/importance`,
      callbackForUpdateTaskImportance,
      "PATCH",
      null,
      token
    );
  }
}
