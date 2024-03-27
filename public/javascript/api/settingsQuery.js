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

          const userCredential__usernameInput = document.querySelector(".user-credential__username-input")
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
  document.querySelector('.tab-account__footer-button-save').addEventListener('click', ()=>{
    const data = {
        username: document.querySelector('.user-credential__username-input').value
    }
    const callbackForUpdateUsername = (responseStatus, responseData) =>{
        if(responseStatus == 200){
            document.querySelector('.user-credential__username-input').value = responseData.username
            window.parent.document.getElementById('usernameDisplay').innerText = responseData.username
            document.querySelector('.tab-account__footer').classList.add('hidden')
        }else{
            alert(responseData.message)
        }
    }

    //Make query to update username
    fetchMethod(currentUrl + `/api/users/${userId}/username`, callbackForUpdateUsername, 'PATCH', data, token)
  })


  ///////////////////////////////////////////////////////////////////////////////////
  // Change Password
  /////////////////////////////////////////////////////////////////////////////////////
  document.querySelector('.tab-change-password__footer-button-save').addEventListener('click', ()=>{
    const newPassword = document.querySelector('.change-password__new-password-input').value
    const confirmPassword = document.querySelector('.change-password__confirm-password-input').value
    const oldPassword = document.querySelector('.change-password__old-password-input').value
    const warningText = document.querySelector('.change-password__warning-text')
    if(newPassword == confirmPassword){
      const data = {
        password: oldPassword,
        new_password: newPassword
      }

      const callbackForUpdatePassword = (responseStatus, responseData) =>{
        if(responseStatus == 200){
          warningText.innerHTML = ''
          //Redirect back to accounts page
          document.getElementById('tab-change-password').classList.add('hidden')
          document.getElementById('tab-account').classList.remove('hidden')

          //Reset form values
          document.querySelector('.change-password__new-password-input').value = ''
          document.querySelector('.change-password__confirm-password-input').value = ''
          document.querySelector('.change-password__old-password-input').value = ''

        }else{
          warningText.innerText = responseData.message
        }
      }

      //Make query to backend
      fetchMethod(currentUrl + `/api/users/${userId}/password`, callbackForUpdatePassword, 'PATCH', data, token)
    }else{
      warningText.innerText = 'Confirmation password does not match'
    }
  })
});
