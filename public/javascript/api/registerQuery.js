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
  // Register user
  /////////////////////////////////////////////////////////////////////////////////////
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("usernameRegisterInput").value;
    const email = document.getElementById("emailRegisterInput").value;
    const password = document.getElementById("passwordRegisterInput").value;
    const confirmPassword = document.getElementById(
      "confirmPasswordRegisterInput"
    ).value;

    //Check if password matches
    if (password == confirmPassword) {
      //If password matches
      const data = {
        username: username,
        email: email,
        password: password,
      };

      //Callback
      const callbackForRegisterUser = (responseStatus, responseData) => {
        if (responseStatus == 200) {
          //If token is provided
          if (responseData.token) {
            //Store token in local storage
            localStorage.setItem("token", responseData.token);
            //Store user id into local storage
            localStorage.setItem("userId", responseData.loggedInUserId);
            //Forward to all tasks page
            window.location.href = "tasks.html";
          }
        } else {
          //Diplay warning
          displayWarning(responseData);
        }
      };

      //Query the backened to register user
      fetchMethod(
        currentUrl + "/api/register",
        callbackForRegisterUser,
        "POST",
        data,
        null
      );
    } else {
      //If password dont match
      displayWarning({ message: "Password does not match" });
    }
  });
});
