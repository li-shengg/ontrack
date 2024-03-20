////////////////////////////////////////////////////////////////////////////////////
// Update task importance (Task container)
/////////////////////////////////////////////////////////////////////////////////////
export  function taskContainerUpdateTaskImportance(event, token) {
    const target = event.target;
    const markTaskAsImportantButton = target.closest(
      ".markTaskAsImportantButton"
    );
    // Check if the clicked element has the class "markTaskAsImportantButton"
    if (markTaskAsImportantButton) {
      const taskId = target.closest(".taskContainer").dataset.taskId;

      const callbackForUpdateTaskImportance = (
        responseStatus,
        responseData
      ) => {
        if (responseStatus == 200) {
          console.log(responseData);
          let markTaskAsImportantSvg = markTaskAsImportantButton.querySelector(
            ".markTaskAsImportantSvg"
          );
          if (responseData.is_important === "true") {
            //If task is updated as important
            markTaskAsImportantSvg.setAttribute("fill", "#1175d3");
          } else if (responseData.is_important === "false") {
            //If task is updated as not important
            markTaskAsImportantSvg.setAttribute("fill", "none");
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