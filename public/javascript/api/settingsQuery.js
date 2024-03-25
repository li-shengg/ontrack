document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Get user info from local storage
  /////////////////////////////////////////////////////////////////////////////////////
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  ///////////////////////////////////////////////////////////////////////////////////
  // Display user credentials
  /////////////////////////////////////////////////////////////////////////////////////
  function displayUserCredential(userId){
    const callbackForDisplayUserCredientials = (responseStatus, responseData) => {
        if (responseStatus == 200) {
          const userCredential__usernameDisplay = document.querySelector(
            ".user-credential__username-display"
          );
          const userCredential__usernameInput = document.querySelector(".user-credential__username-input")
          userCredential__usernameDisplay.innerText = responseData.username;
          userCredential__usernameInput.value = responseData.username

          //Display Email
          document.querySelector('.user-credential__email-display').innerText = responseData.email
        } else {
          alert(responseData.message);
        }
      };
    
      //make bakcebd query
       //Fetch query to fetch user credentials
       fetchMethod(
        currentUrl + `/api/users/${userId}/credentials`,
        callbackForDisplayUserCredientials
      );
  }

  displayUserCredential(userId)


   ///////////////////////////////////////////////////////////////////////////////////
  // Update username
  /////////////////////////////////////////////////////////////////////////////////////
  document.querySelector('.tab-account__footer-button-update').addEventListener('click', ()=>{
    const data = {
        username: document.querySelector('.user-credential__username-input').value
    }
    const callbackForUpdateUsername = (responseStatus, responseData) =>{
        if(responseStatus == 200){
            document.querySelector('.user-credential__username-input').value = responseData.username
            document.querySelector('.user-credential__username-display').innerHTML = responseData.username
            window.parent.document.getElementById('usernameDisplay').innerText = responseData.username
            document.querySelector('.tab-account__footer').classList.add('hidden')
        }else{
            alert(responseData.message)
        }
    }

    //Make query to update username
    fetchMethod(currentUrl + `/api/users/${userId}/username`, callbackForUpdateUsername, 'PATCH', data, token)
  })
});
