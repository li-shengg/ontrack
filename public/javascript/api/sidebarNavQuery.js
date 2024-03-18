document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Get user info from local storage
  /////////////////////////////////////////////////////////////////////////////////////
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  ///////////////////////////////////////////////////////////////////////////////////
  // Display User Username
  /////////////////////////////////////////////////////////////////////////////////////
  function displayUsername(userId) {
    const usernameDisplay = document.getElementById("usernameDisplay");
    const callbackForDisplayUsername = (responseStatus, responseData) => {
      if (responseStatus == 200) {
        usernameDisplay.innerText = responseData.username;
      } else {
        alert(responseData.message);
      }
    };

    //Fetch query to fetch user credentials
    fetchMethod(
      currentUrl + `/api/users/${userId}/credentials`,
      callbackForDisplayUsername
    );
  }

  displayUsername(userId)
});
