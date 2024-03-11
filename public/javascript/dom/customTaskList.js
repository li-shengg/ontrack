document.addEventListener('DOMContentLoaded', ()=>{
  ///////////////////////////////////////////////////////////////////////////////////
  // Toggle Update custom listname input
  /////////////////////////////////////////////////////////////////////////////////////
  const customListTitleContainer = document.getElementById('customListTitleContainer')
  customListTitleContainer.addEventListener('click', ()=>{
    const updateCustomListNameInput = document.getElementById('updateCustomListNameInput')
    const customListName = document.getElementById('customListName')
    console.log(updateCustomListNameInput.style.display)
    if(updateCustomListNameInput.style.display = 'none'){
        console.log('das')
        updateCustomListNameInput.style.display = 'block'
        customListName.style.display= 'none'
    }
  })
})