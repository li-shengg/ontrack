///////////////////////////////////////////////////////////////////////////////////
// Update task title  by task id (Task container)
/////////////////////////////////////////////////////////////////////////////////////
export function taskContainerUpdateTaskTitle(event, token) {
  const target = event.target;
  const taskContainer = target.closest(".taskContainer");

  if (taskContainer) {
    const taskId = taskContainer.dataset.taskId;
    const updateTaskTitleInput = taskContainer.querySelector(
      ".updateTaskTitleInput"
    );
    const taskBodyTitle = taskContainer.querySelector(".taskBodyTitle");
    //Everytime when a user input on the update task input, a query willl be sent
    updateTaskTitleInput.addEventListener("input", (event) => {
      const data = {
        task_title: updateTaskTitleInput.value,
      };
      const callbackForUpdateTaskTitle = (responseStatus, responseData) => {
        if (responseStatus == 200) {
          //Set the placeholder to the value of the updated input
          updateTaskTitleInput.setAttribute(
            "placeholder",
            updateTaskTitleInput.value
          );
          //Set the task title to the value of the updated input
          taskBodyTitle.innerText = updateTaskTitleInput.value;

          displayTaskDetails(event);
        } else {
          alert(responseData.message);
        }
      };

      //Query to update task title
      fetchMethod(
        currentUrl + `/api/tasks/${taskId}/title`,
        callbackForUpdateTaskTitle,
        "PATCH",
        data,
        token
      );
    });
  }
}