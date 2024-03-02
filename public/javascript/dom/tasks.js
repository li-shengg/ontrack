document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle main task app sidebar
  /////////////////////////////////////////////////////////////////////////////////////
  const mainTaskAppSidebarToggler = document.getElementById(
    "mainTaskAppSidebarToggler"
  );
  const mainTaskAppSidebar = document.getElementById("mainTaskAppSidebar");
  mainTaskAppSidebarToggler.addEventListener("click", () => {
    if (getComputedStyle(mainTaskAppSidebar).display == "block") {
      //If display is block, click will become none
      mainTaskAppSidebar.style.display = "none";
    } else if (getComputedStyle(mainTaskAppSidebar).display == "none")
      //If display is none, click will become block
      mainTaskAppSidebar.style.display = "block";
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Hide items when any part of the document is clicked
  /////////////////////////////////////////////////////////////////////////////////////
  document.addEventListener("click", (event) => {
    //When anywhere of the page is clicked, hide the task menu
    hideListActionMenu();
    hideTaskActionMenu();
    hideUpdateTaskTitleInput(event);
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle list action menu
  /////////////////////////////////////////////////////////////////////////////////////
  const createdListTabsContainerWrapper = document.getElementById(
    "createdListTabsContainerWrapper"
  );
  //Function to hide the menu
  function hideListActionMenu() {
    //Set display to none
    document.getElementById("listActionMenu").style.display = "none";
  }

  createdListTabsContainerWrapper.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const target = event.target;
    //If clicked element is the list that is created
    if (target.closest(".createdList")) {
      const listActionMenu = document.getElementById("listActionMenu");
      if (listActionMenu.style.display == "block") {
        //If the display is block, hide menu
        hideListActionMenu();
      } else {
        //otherwise, show the menu
        const deleteListButton = document.getElementById("deleteListButton");
        //Set the list id to the delete button
        deleteListButton.dataset.listId = target.dataset.listId;
        //Diplay the task menu
        listActionMenu.style.display = "block";
        listActionMenu.style.left = event.pageX + "px";
        listActionMenu.style.top = event.pageY + "px";
      }
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle list action menu
  /////////////////////////////////////////////////////////////////////////////////////
  const taskDisplayContainer = document.getElementById("taskDisplayContainer");
  //Function to hide the menu
  function hideTaskActionMenu() {
    //Set display to none
    document.getElementById("taskActionMenu").style.display = "none";
  }

  taskDisplayContainer.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.closest(".taskContainer")) {
      const taskActionMenu = document.getElementById("taskActionMenu");
      if (taskActionMenu.style.display == "block") {
        //If display is block, hide the menu
        hideTaskActionMenu();
      } else {
        //Add the task id into the delete button
        const deleteTaskButton = document.getElementById("deleteTaskButton");
        console.log(target);
        deleteTaskButton.dataset.taskId = target.dataset.taskId;
        console.log(target.dataset.taskId);
        //If display is none, show the menu
        taskActionMenu.style.display = "block";
        taskActionMenu.style.left = event.pageX + "px";
        taskActionMenu.style.top = event.pageY + "px";
      }
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle edit task input
  /////////////////////////////////////////////////////////////////////////////////////
  function hideUpdateTaskTitleInput(event) {
    const target = event.target;
    console.log(target);
    const taskContainer = target.closest(".taskContainer");
    const updateTaskTitleInput = document.querySelector(
      ".updateTaskTitleInput"
    );
    const taskBodyTitle = document.querySelector(".taskBodyTitle");

    // Check if the click target is not inside a .taskContainer element and the input is visible
    if (
      !taskContainer &&
      updateTaskTitleInput &&
      updateTaskTitleInput.style.display === "block"
    ) {
      // Hide the input and show the task title
      updateTaskTitleInput.style.display = "none";
      taskBodyTitle.style.display = "block";
    }
  }

  taskDisplayContainer.addEventListener("click", (event) => {
    const target = event.target;
    const taskContainer = target.closest(".taskContainer");
    if (taskContainer) {
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
  });
});
