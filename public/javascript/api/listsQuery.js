document.addEventListener('DOMContentLoaded', ()=>{
    ///////////////////////////////////////////////////////////////////////////////////
  // Get user info from local storage
  /////////////////////////////////////////////////////////////////////////////////////
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

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
          window.location.reload();
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
  const createdListTabsContainer = document.getElementById(
    "createdListTabsContainer"
  );
  const callbackForDisplayAllUserLists = (responseStatus, responseData) => {
    if (responseStatus == 200) {
      responseData.forEach((list) => {
        const newList = document.createElement("li");
        //Add list id into data
        newList.innerHTML += `
            <a href="#" data-list-id = ${list.list_id} class = 'createdList'>
               <svg
                 width="24px"
                 height="24px"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                 <g
                   id="SVGRepo_tracerCarrier"
                   stroke-linecap="round"
                   stroke-linejoin="round"
                 ></g>
                 <g id="SVGRepo_iconCarrier">
                   <path
                     d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                     stroke="#000000"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                   ></path>
                 </g>
               </svg>
               ${list.list_name}
            </a>

            `;
        //Appen new list to container
        createdListTabsContainer.append(newList);
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
})