document.addEventListener('DOMContentLoaded', ()=>{
    const searchBarInput = document.getElementById('searchBarInput')

    const searchInputValue = searchBarInput.value
    //If user is searching and the page is not search.html, redirect user to search.html
    searchBarInput.addEventListener('input', ()=>{
        if(window.location.pathname !== '/search.html'){
            window.location.href = 'search.html'
            searchBarInput.focus()
            searchBarInput.value = searchInputValue
        }
    })
})