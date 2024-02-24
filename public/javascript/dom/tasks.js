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
});
