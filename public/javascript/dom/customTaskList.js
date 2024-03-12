document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle Update custom listname input
  /////////////////////////////////////////////////////////////////////////////////////
  const customListTitleContainer = document.getElementById(
    "customListTitleContainer"
  );
  customListTitleContainer.addEventListener("click", () => {
    const updateCustomListNameInput = document.getElementById(
      "updateCustomListNameInput"
    );
    const customListName = document.getElementById("customListName");
    console.log(updateCustomListNameInput.style.display);

    //If original display is none
    if ((updateCustomListNameInput.style.display = "none")) {
      //Display the input
      updateCustomListNameInput.style.display = "block";
      customListName.style.display = "none";
      //Focus on the input
      updateCustomListNameInput.focus();
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Hide Update custom listname input
  /////////////////////////////////////////////////////////////////////////////////////
  function hideUpdateCustomListNameInput(event) {
    const target = event.target
    if(!target.closest('#customListTitleContainer')){
      //If clicked element is not the list title container, hide input and show name
      document.getElementById("updateCustomListNameInput").style.display = "none";
      document.getElementById("customListName").style.display = "block";
    }
   
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Click event listener for document
  /////////////////////////////////////////////////////////////////////////////////////
  document.addEventListener('click', (event)=>{
    hideUpdateCustomListNameInput(event)
  })
});
