document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Display warning function
  /////////////////////////////////////////////////////////////////////////////////////
  function displayWarning(responseData) {
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    warningCard.style.display = "flex";
    warningText.innerText = responseData.message;
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // Login user
  /////////////////////////////////////////////////////////////////////////////////////
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      email: document.getElementById("emailLoginInput").value,
      password: document.getElementById("passwordLoginInput").value,
    };
    const callbackForLoginUser = (responseStatus, responseData) => {
      //If login is successful
      if (responseStatus == 200) {
        //Check if token exists
        if (responseData.token) {
          //Store token into local storage
          localStorage.setItem("token", responseData.token);
          //Store user id into local storage
          localStorage.setItem("userId", responseData.loggedInUserId);

          //Forward to all tasks page
          window.location.href = 'tasks.html'
        }
      } else {
        //If error
        displayWarning(responseData);
      }
    };

    //Make query to login user
    fetchMethod(
      currentUrl + "/api/login",
      callbackForLoginUser,
      "POST",
      data,
      null
    );
  });
});
