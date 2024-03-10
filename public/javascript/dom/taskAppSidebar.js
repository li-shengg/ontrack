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
  document.addEventListener('click', ()=>{
    hideListActionMenu()
  })

 ///////////////////////////////////////////////////////////////////////////////////
  // Hide list action menu
  /////////////////////////////////////////////////////////////////////////////////////
  const createdListTabsContainerWrapper = document.getElementById(
    "createdListTabsContainerWrapper"
  );
  //Function to hide the menu
  function hideListActionMenu() {
    //Set display to none
    document.getElementById("listActionMenu").style.display = "none";
  }

  
  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle list action menu
  /////////////////////////////////////////////////////////////////////////////////////
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
});
