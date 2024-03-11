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
  function displayListDetails(){
    const customListName = document.getElementById('customListName')
    const callbackForDisplayListName = (responseStatus, responseData) =>{
        console.log(responseStatus)
        if(responseStatus == 200){
            customListName.innerText = responseData.list_name
        }else{
            alert(responseData.message)
        }
    }

     //Make query to backend
     fetchMethod(
        currentUrl + `/api/lists/${listId}`,
        callbackForDisplayListName
      );
  }

  displayListDetails()
});
