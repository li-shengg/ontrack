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
  // Toggle list action
  /////////////////////////////////////////////////////////////////////////////////////
  const createdListTabsContainerWrapper = document.getElementById(
    "createdListTabsContainerWrapper"
  );
  //Function to hide the menu
  function hideListActionsMenu() {
    //Set display to none
    document.getElementById("listActionsMenu").style.display = "none";
  }

  document.addEventListener("click", () => {
    //When anywhere of the page is clicked, hide the menu
    hideListActionsMenu();
  });

  createdListTabsContainerWrapper.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const target = event.target;
    //If clicked element is the list that is created
    if (target.closest(".createdList")) {
      const listActionsMenu = document.getElementById("listActionsMenu");
      if (listActionsMenu.style.display == " block") {
        //If the display is block, hide menu
        hideListActionsMenu();
      } else {
        //otherwise, show the menu
        const deleteListButton = document.getElementById('deleteListButton')
        //Set the list id to the delete button
        deleteListButton.dataset.listId = target.dataset.listId
        //Diplay the task menu
        listActionsMenu.style.display = "block";
        listActionsMenu.style.left = event.pageX + "px";
        listActionsMenu.style.top = event.pageY + "px";
      }

    }
  });
});
