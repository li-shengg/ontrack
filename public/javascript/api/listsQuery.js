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
  // Create lists
  /////////////////////////////////////////////////////////////////////////////////////
  const newListInput = document.getElementById("newListInput");
  newListInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      const data = {
        userId: userId,
        list_name: newListInput.value,
      };

      const callbackForCreateNewList = (responseStatus, responseData) => {
        if (responseStatus == 201) {
          //If create successfully
          const customListsContainer = document.getElementById(
            "customListsContainer"
          );

          customListsContainer.innerHTML += `
          <li>
          <a href="customTaskList.html?list_id=${responseData.list_id}" data-list-id = ${responseData.list_id} class = 'createdList'>
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="0.8"
              d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
            />
          </svg>

          ${responseData.list_name}
       </a>
       </li>
          `;
          newListInput.value = "";
        } else {
          //If there is an error
          alert(responseData.message);
        }
      };

      //Make query to backend to create new lists
      fetchMethod(
        currentUrl + `/api/lists`,
        callbackForCreateNewList,
        "POST",
        data,
        token
      );
    }
  });

  ///////////////////////////////////////////////////////////////////////////////////
  // Display list by user id
  /////////////////////////////////////////////////////////////////////////////////////
  function displayAllUserLists() {
    const customListsContainer = document.getElementById(
      "customListsContainer"
    );
    const callbackForDisplayAllUserLists = (responseStatus, responseData) => {
      if (responseStatus == 200) {
        responseData.forEach((list) => {
          const newList = document.createElement("li");
          //If the list id match the current url list id, make the list active
          if(listId){
            if(listId == list.list_id){
              newList.classList+='activeTaskTab'
            }
          }
          //Add list id into data
          newList.innerHTML += `
              <a href="customTaskList.html?list_id=${list.list_id}" data-list-id = ${list.list_id} class = 'createdList'>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="0.8"
                  d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
                />
              </svg>
  
                 ${list.list_name}
              </a>
  
              `;
          //Appen new list to container
          customListsContainer.append(newList);
        });
      } else {
        alert(responseData.message);
      }
    };

    //Make query to backend
    fetchMethod(
      currentUrl + `/api/users/${userId}/lists`,
      callbackForDisplayAllUserLists
    );
  }

  displayAllUserLists();

  ///////////////////////////////////////////////////////////////////////////////////
  // Delete list by list id
  /////////////////////////////////////////////////////////////////////////////////////
  const deleteListButton = document.getElementById("deleteListButton");
  deleteListButton.addEventListener("click", () => {
    //Get the list ID
    const listId = deleteListButton.dataset.listId;
    const callbackForDeleteList = (responseStatus, responseData) => {
      if (responseStatus == 204) {
        //If delete successfully
        window.location.reload();
      } else {
        //If error
        alert(responseData.message);
      }
    };

    //Make query to backend to delete
    fetchMethod(
      currentUrl + `/api/lists/${listId}`,
      callbackForDeleteList,
      "DELETE",
      null,
      token
    );
  });
});
