document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle task details container
  /////////////////////////////////////////////////////////////////////////////////////
  function toggleTaskDetailsContainer(event) {
    const target = event.target;
    const taskContainer = target.closest(".taskContainer");
    if (
      taskContainer &&
      !(
        target.closest(".taskCompleteButton") ||
        target.closest(".markTaskAsImportantButton")
      )
    ) {
      //Display task details
      const taskDetailSidebar = document.getElementById(
        "taskDetailSidebar"
      );

      if ((taskDetailSidebar.style.display = "none")) {
        taskDetailSidebar.style.display = "flex";

        //Reset the color of all other task container
        const allTaskContainer = document.querySelectorAll(".taskContainer");
        allTaskContainer.forEach((taskContainer) => {
          taskContainer.style.backgroundColor = "";
        });

        //Set the background color of the clicked task container
        taskContainer.style.backgroundColor = "#E4E4E4";
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Hide task details sidebar
  /////////////////////////////////////////////////////////////////////////////////////
  const hideTaskDetailSidebarButton = document.getElementById(
    "hideTaskDetailSidebarButton"
  );
  hideTaskDetailSidebarButton.addEventListener("click", () => {
    const taskDetailSidebar = document.getElementById(
      "taskDetailSidebar"
    );
    //Hide the details container
    taskDetailSidebar.style.display = "none";

    //Reset back the background color of the task container
    const allTaskContainer = document.querySelectorAll(".taskContainer");
    allTaskContainer.forEach((taskContainer) => {
      taskContainer.style.backgroundColor = "";
    });
  });

   ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener
  /////////////////////////////////////////////////////////////////////////////////////
  document.addEventListener('click', (event)=>{
    toggleTaskDetailsContainer(event)
  })
});
