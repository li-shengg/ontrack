document.addEventListener("DOMContentLoaded", () => {


  ///////////////////////////////////////////////////////////////////////////////////
  //  Load sidebar width
  /////////////////////////////////////////////////////////////////////////////////////
  function loadSidebarNavWidth(){
    const sidebarNavWidth = localStorage.getItem('sidebarNavWidth')

    //Load the most recent sidebar width
    document.getElementById('sidebarNav').style.width = sidebarNavWidth + 'px'
  }
  loadSidebarNavWidth()

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle main task app sidebar
  /////////////////////////////////////////////////////////////////////////////////////
  /*
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
*/
  ///////////////////////////////////////////////////////////////////////////////////
  // Hide items when any part of the document is clicked
  /////////////////////////////////////////////////////////////////////////////////////
  document.addEventListener("click", () => {
    hideListActionMenu();
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Change length of sidebar
  /////////////////////////////////////////////////////////////////////////////////////
  const sidebarResizeDraggable = document.getElementById(
    "sidebarResizeDraggable"
  );
  let isMouseDown = false;
  sidebarResizeDraggable.addEventListener("mousedown", (event) => {
  const sidebarNav = document.getElementById('sidebarNav')
   //Change the isMouseDown to true to indicate mouse is pressed
   isMouseDown = true
  //Get the initial X axis of the sidebar
   const initialX = event.pageX
   //Get the initial width of the sidebar
   const initialWidth = sidebarNav.offsetWidth
   function onMouseDown(event){
    if(isMouseDown){
      //If mouse is pressed, calculate new width of the sidebar
      const newWidth = initialWidth + (event.pageX - initialX)

      //Apply new width of sidebar
      sidebarNav.style.width = newWidth + 'px'

      //Store the sidebar width into the local storage, so that when page loads, sidebar width remians the same
      localStorage.setItem('sidebarNavWidth', newWidth)
    }
   }

   function onMouseUp(){
    //set the is mouse down to false to indicate that mouse is up
    isMouseDown = false
    //Remove all event listner to calculate width
    document.removeEventListener('mouseover', onMouseUp)
    document.removeEventListener('mousemove', onMouseDown)
  }

  //Event Listener for mouse move
  document.addEventListener('mousemove', onMouseDown)
  //Event Listener for mouse up
  document.addEventListener('mouseup', onMouseUp )

  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Hide list action menu
  /////////////////////////////////////////////////////////////////////////////////////
  const customListsContainer = document.getElementById("customListsContainer");
  //Function to hide the menu
  function hideListActionMenu() {
    //Set display to none
    document.getElementById("listActionMenu").style.display = "none";
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle list action menu
  /////////////////////////////////////////////////////////////////////////////////////
  customListsContainer.addEventListener("contextmenu", (event) => {
    console.log("dadasdas");
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
