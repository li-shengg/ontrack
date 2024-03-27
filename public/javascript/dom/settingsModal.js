document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Close setting modal
  /////////////////////////////////////////////////////////////////////////////////////
  function closeSettingsModalFrame() {
    const settingsModalFrame =
      window.parent.document.getElementById("settingsModalFrame");
      settingsModalFrame.classList.replace('d-block', 'd-none');
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
  // Toggle Tab Accout footer
  /////////////////////////////////////////////////////////////////////////////////////
  document
    .querySelector(".user-credential__username-input")
    .addEventListener("input", () => {
      const userCredential__usernameInput = document.querySelector(
        ".user-credential__username-input"
      );
      const tabAccount__footer = document.querySelector(".tab-account__footer");
      //Initial value
      const initialUsername =
        window.parent.document.getElementById("usernameDisplay").innerText;

      if (
        userCredential__usernameInput.value != initialUsername &&
        tabAccount__footer.classList.contains("hidden")
      ) {
        tabAccount__footer.classList.remove("hidden");
      } else if (
        userCredential__usernameInput.value == initialUsername &&
        !tabAccount__footer.classList.contains("hidden")
      ) {
        tabAccount__footer.classList.add("hidden");
      }
    });

  ///////////////////////////////////////////////////////////////////////////////////
  // Undo changes (Tab Accout footer)
  /////////////////////////////////////////////////////////////////////////////////////
  document
    .querySelector(".tab-account__footer-button-cancle")
    .addEventListener("click", () => {
      const userCredential__usernameInput = document.querySelector(
        ".user-credential__username-input"
      );
      const tabAccount__footer = document.querySelector(".tab-account__footer");
      //Initial value
      const initialUsername =
        window.parent.document.getElementById("usernameDisplay").innerText;

      //Hide the footer
      tabAccount__footer.classList.add("hidden");
      userCredential__usernameInput.value = initialUsername;
    });

  ///////////////////////////////////////////////////////////////////////////////////
  // Redirect to change email/password page
  /////////////////////////////////////////////////////////////////////////////////////
  document
    .querySelectorAll(".user-credential__button")
    .forEach((actionButton) => {
      actionButton.addEventListener("click", () => {
        const tabId = actionButton.getAttribute("data-tab");

        //Reset current tab
        document
          .querySelectorAll(".settings-modal__main-body-content")
          .forEach((tabContent) => {
            tabContent.classList.add("hidden");
          });

        //remove hiddden from the clicked tab
        document.getElementById(`tab-${tabId}`).classList.remove("hidden");
      });
    });

  ///////////////////////////////////////////////////////////////////////////////////
  // Undo changes (Change password footer)
  /////////////////////////////////////////////////////////////////////////////////////
  document
    .querySelector(".tab-change-password__footer-button-cancle")
    .addEventListener("click", () => {
      document.getElementById("tab-change-password").classList.add("hidden");
      document.getElementById("tab-account").classList.remove("hidden");
      document.querySelector(".change-password__warning-text").innerText = "";
      //Reset form values
      document.querySelector(".change-password__new-password-input").value = "";
      document.querySelector(".change-password__confirm-password-input").value =
        "";
      document.querySelector(".change-password__old-password-input").value = "";

      document.querySelector(
        ".tab-change-password__footer-button-save"
      ).disabled = true;
    });

  ///////////////////////////////////////////////////////////////////////////////////
  // Enable save button (Change password footer)
  /////////////////////////////////////////////////////////////////////////////////////
  function enableSavePasswordChangesButton() {
    const newPassword = document
      .querySelector(".change-password__new-password-input")
      .value.trim();
    const confirmPassword = document
      .querySelector(".change-password__confirm-password-input")
      .value.trim();
    const oldPassword = document
      .querySelector(".change-password__old-password-input")
      .value.trim();

    if (newPassword !== "" && confirmPassword !== "" && oldPassword !== "") {
      document.querySelector(
        ".tab-change-password__footer-button-save"
      ).disabled = false;
    } else {
      document.querySelector(
        ".tab-change-password__footer-button-save"
      ).disabled = true;
    }
  }
  document
    .querySelector(".change-password__new-password-input")
    .addEventListener("input", enableSavePasswordChangesButton);
  document
    .querySelector(".change-password__confirm-password-input")
    .addEventListener("input", enableSavePasswordChangesButton);
  document
    .querySelector(".change-password__old-password-input")
    .addEventListener("input", enableSavePasswordChangesButton);
});
