document.addEventListener("DOMContentLoaded", () => {
  ///////////////////////////////////////////////////////////////////////////////////
  // Get user info from local storage
  /////////////////////////////////////////////////////////////////////////////////////
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  ///////////////////////////////////////////////////////////////////////////////////
  // Get list id from the url
  /////////////////////////////////////////////////////////////////////////////////////
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const listId = urlParams.get("list_id");

  ///////////////////////////////////////////////////////////////////////////////////
  // Display list name
  /////////////////////////////////////////////////////////////////////////////////////
  function displayCustomListName(){
    const callbackForDisplayCustomListName = (responseStatus, responseData) =>{
      if(responseStatus == 200){
        const customListName = document.getElementById('customListName')
        const updateCustomListNameInput = document.getElementById('updateCustomListNameInput')
        //Display current list name
        customListName.innerHTML = responseData.list_name
        //Set the value of the update input to the current list name
        updateCustomListNameInput.value = responseData.list_name
      }else{
        alert(responseData.message)
      }
    }
  
    //Make query ti backend
    fetchMethod(currentUrl + `/api/lists/${listId}`, callbackForDisplayCustomListName)
  }

  displayCustomListName()

  ///////////////////////////////////////////////////////////////////////////////////
  // Update List Name by List Id
  /////////////////////////////////////////////////////////////////////////////////////
  const updateCustomListNameInput = document.getElementById('updateCustomListNameInput')
  updateCustomListNameInput.addEventListener('input', ()=>{
    const data = {
      list_name: updateCustomListNameInput.value
    }

    const callbackForUpdateCustomListName = (responseStatus, responseData) =>{
      if(responseStatus == 200){
        const customListName = document.getElementById('customListName')
        const updateCustomListNameInput = document.getElementById('updateCustomListNameInput')
        //Display current list name
        customListName.innerHTML = responseData.list_name
        //Set the value of the update input to the current list name
        updateCustomListNameInput.value = responseData.list_name
      }else{
        alert(responseData.message)
      }
    }

    // Make query to update list name
    fetchMethod(currentUrl + `/api/lists/${listId}`, callbackForUpdateCustomListName, 'PUT' ,data, token)
  })

});
