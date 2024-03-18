document.addEventListener('DOMContentLoaded', ()=>{
    const signOutButton = document.getElementById('signOutButton')

    signOutButton.addEventListener('click', ()=>{
        window.location.href = 'login.html'
        //CLear local storage
        localStorage.clear()
    })
})