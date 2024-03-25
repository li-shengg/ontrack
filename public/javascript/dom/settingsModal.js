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

  ///////////////////////////////////////////////////////////////////////////////////
  // Event Listener for document
  /////////////////////////////////////////////////////////////////////////////////////
  document.addEventListener("click", (event) => {
    const target = event.target;

    //If clicked outside of the modal
    if (!target.closest(".settings-modal")) {
      closeSettingsModalFrame();
    }

    hideUpdateUsernameInput(event);
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle Tabs
  /////////////////////////////////////////////////////////////////////////////////////
  const settingsModal__sidebarLinks = document.querySelectorAll(
    ".settings-modal__sidebar-link"
  );
  settingsModal__sidebarLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", () => {
      const tabId = tabLink.getAttribute("data-tab");

      //Reset current tab
      document
        .querySelectorAll(".settings-modal__main-body-content")
        .forEach((tabContent) => {
          tabContent.classList.add("hidden");
        });

      //remove hiddden from the clicked tab
      document.getElementById(`tab-${tabId}`).classList.remove("hidden");

      //Remove active from the sidebar links
      settingsModal__sidebarLinks.forEach((tabLink) => {
        tabLink.parentNode.classList.remove("active");
      });

      //Add active class to the current tab
      tabLink.parentNode.classList.add("active");
    });
  });
  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle Update Username input
  /////////////////////////////////////////////////////////////////////////////////////
  document
    .querySelector(".user-credential__username-display")
    .addEventListener("click", () => {
      const userCredential__usernameDisplay = document.querySelector(
        ".user-credential__username-display"
      );
      const userCredential__usernameInput = document.querySelector(
        ".user-credential__username-input"
      );

      if (userCredential__usernameInput.classList.contains("hidden")) {
        userCredential__usernameInput.classList.remove("hidden");
        userCredential__usernameDisplay.classList.add("hidden");
        userCredential__usernameInput.focus();
      }
    });

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle Update Username input
  /////////////////////////////////////////////////////////////////////////////////////
  function hideUpdateUsernameInput(event) {
    const target = event.target;
    if (
      !target.closest(".user-credential__username-display") &&
      !target.closest(".user-credential__username-input")
    ) {
      const userCredential__usernameInput = document.querySelector(
        ".user-credential__username-input"
      );
      const userCredential__usernameDisplay = document.querySelector(
        ".user-credential__username-display"
      );
      userCredential__usernameInput.classList.add("hidden");
      userCredential__usernameDisplay.classList.remove("hidden");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle Tab Accout footer
  /////////////////////////////////////////////////////////////////////////////////////
  document.querySelector('.user-credential__username-input').addEventListener('input', ()=>{
    const userCredential__usernameInput = document.querySelector('.user-credential__username-input')
    const  tabAccount__footer =  document.querySelector('.tab-account__footer')
    //Initial value
    const initialUsername =  document.querySelector('.user-credential__username-display').innerHTML

    if(userCredential__usernameInput.value != initialUsername && tabAccount__footer.classList.contains('hidden')){
      tabAccount__footer.classList.remove('hidden')
    }else if(userCredential__usernameInput.value == initialUsername && !tabAccount__footer.classList.contains('hidden')){
      tabAccount__footer.classList.add('hidden')
    }
  })

  ///////////////////////////////////////////////////////////////////////////////////
  // Undo changes (Tab Accout footer)
  /////////////////////////////////////////////////////////////////////////////////////
  document.querySelector('.tab-account__footer-button-cancle').addEventListener('click', ()=>{
    const userCredential__usernameInput = document.querySelector('.user-credential__username-input')
    const  tabAccount__footer =  document.querySelector('.tab-account__footer')
    //Initial value
    const initialUsername =  document.querySelector('.user-credential__username-display').innerHTML

    //Hide the footer
    tabAccount__footer.classList.add('hidden')
    userCredential__usernameInput.value = initialUsername
  })
});
