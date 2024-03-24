document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Close setting modal
  /////////////////////////////////////////////////////////////////////////////////////
  function closeSettingsModalFrame() {
    const settingsModalFrame =
      window.parent.document.getElementById("settingsModalFrame");
    settingsModalFrame.style.display = "none";
  }
  const settingsModal__mainHeaderCloseButton = document.querySelector(
    ".settings-modal__main-header-close-button"
  );
  settingsModal__mainHeaderCloseButton.addEventListener(
    "click",
    closeSettingsModalFrame
  );

  document.addEventListener('click', (event)=>{
    const target = event.target

    //If clicked outside of the modal
    if(!target.closest('.settings-modal')){
        closeSettingsModalFrame()
    }
  })
});
