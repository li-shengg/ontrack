document.addEventListener('DOMContentLoaded', ()=>{
    
  ///////////////////////////////////////////////////////////////////////////////////
  // Load Local Mode
  /////////////////////////////////////////////////////////////////////////////////////
  function loadLocalMode(){
    const localSettings = JSON.parse(localStorage.getItem("localSettings"));
    const html = document.querySelector('html')

    if (localSettings) {
        if (localSettings.mode == "dark") {
            html.dataset.mode = 'dark'
        } else if (localSettings.mode == "light") {
            html.dataset.mode = 'light'
        }
    }else{
        //Load default mode
        html.dataset.mode = 'light'
    }
  }

  loadLocalMode()
})