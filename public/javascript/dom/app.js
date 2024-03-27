document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Hide items when any part of the document is clicked
  /////////////////////////////////////////////////////////////////////////////////////
  document.addEventListener("click", (event) => {
    //When anywhere of the page is clicked, hide the task menu
    hideTaskActionMenu();
    hideUpdateTaskTitleInput(event);
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Hide task action menu
  /////////////////////////////////////////////////////////////////////////////////////
  const taskList = document.querySelector(".task-list");
  //Function to hide the menu
  function hideTaskActionMenu() {
    //Set display to none
    document.getElementById("taskActionMenu").style.display = "none";
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle task action menu
  /////////////////////////////////////////////////////////////////////////////////////
  taskList.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const target = event.target;
    const taskContainer = target.closest(".taskContainer");
    if (taskContainer) {
      const taskActionMenu = document.getElementById("taskActionMenu");
      if (taskActionMenu.style.display == "block") {
        //If display is block, hide the menu
        hideTaskActionMenu();
      } else {
        //Add the task id into the delete button
        const deleteTaskButton = document.getElementById("deleteTaskButton");

        deleteTaskButton.dataset.taskId = taskContainer.dataset.taskId;

        //If display is none, show the menu
        taskActionMenu.style.display = "block";
        taskActionMenu.style.left = event.pageX + "px";
        taskActionMenu.style.top = event.pageY + "px";
      }
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Hide task title input
  /////////////////////////////////////////////////////////////////////////////////////
  function hideUpdateTaskTitleInput(event) {
    const target = event.target;
    const taskContainer = target.closest(".taskContainer");
    const updateTaskTitleInputs = document.querySelectorAll(
      ".updateTaskTitleInput"
    );
    const taskBodyTitles = document.querySelectorAll(".taskBodyTitle");

    // Check if the click target is not inside a .taskContainer element and the inputs are visible
    if (
      !taskContainer &&
      updateTaskTitleInputs &&
      taskBodyTitles &&
      updateTaskTitleInputs.length === taskBodyTitles.length
    ) {
      // Iterate over each updateTaskTitleInput element and hide it
      updateTaskTitleInputs.forEach((input, index) => {
        if (input.style.display === "block") {
          input.style.display = "none";
          taskBodyTitles[index].style.display = "block";
        }
      });
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle edit task input
  /////////////////////////////////////////////////////////////////////////////////////
  function toggleEditTaskInput(event) {
    const target = event.target;
    const taskContainer = target.closest(".taskContainer");
    if (
      taskContainer &&
      !(
        target.closest(".taskCompleteButton") ||
        target.closest(".markTaskAsImportantButton")
      )
    ) {
      const updateTaskTitleInput = taskContainer.querySelector(
        ".updateTaskTitleInput"
      );
      const taskBodyTitle = taskContainer.querySelector(".taskBodyTitle");

      //Set the body to display none
      taskBodyTitle.style.display = "none";
      //Display the input
      updateTaskTitleInput.style.display = "block";

      // Focus on the input
      updateTaskTitleInput.focus();
    }
  }


  ///////////////////////////////////////////////////////////////////////////////////
  // EVent listener for task display container
  /////////////////////////////////////////////////////////////////////////////////////
  taskList.addEventListener("click", (event) => {
    toggleEditTaskInput(event);
  });

  
  ///////////////////////////////////////////////////////////////////////////////////
  // Event listener for settings modal
  /////////////////////////////////////////////////////////////////////////////////////
  const settingsButton = document.getElementById('settingsButton')
  settingsButton.addEventListener('click', ()=>{
    const settingsModalFrame = document.getElementById('settingsModalFrame')
    settingsModalFrame.classList.replace('d-none', 'd-block');
  })
});
