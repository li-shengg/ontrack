
///////////////////////////////////////////////////////////////////////////////////
// Delete task by task id (Delete context menu)
/////////////////////////////////////////////////////////////////////////////////////
export function actionMenuDeleteTask(token){
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
}

  ///////////////////////////////////////////////////////////////////////////////////
  // Delete task by task id (Task details delete button)
  /////////////////////////////////////////////////////////////////////////////////////
export function taskDetailsDeleteTask(token){
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
    
}