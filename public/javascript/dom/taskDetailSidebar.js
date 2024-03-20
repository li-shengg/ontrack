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
      const detail = document.querySelector(
        ".detail"
      );

      if ((detail.style.display = "none")) {
        detail.style.display = "flex";

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
  const detail__footerCloseButton = document.querySelector(
    ".detail__footer-close-button"
  );
  detail__footerCloseButton.addEventListener("click", () => {
    const detail = document.querySelector(
      ".detail"
    );
    //Hide the details container
    detail.style.display = "none";

    //Reset back the background color of the task container
    const allTaskContainer = document.querySelectorAll(".taskContainer");
    allTaskContainer.forEach((taskContainer) => {
      taskContainer.style.backgroundColor = "";
    });
  });

   ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener
  /////////////////////////////////////////////////////////////////////////////////////
  const taskList = document.querySelector('.task-list')
  taskList.addEventListener('click', (event)=>{
    toggleTaskDetailsContainer(event)
  })
});
