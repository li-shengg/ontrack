document.addEventListener('DOMContentLoaded', ()=>{
    const removeWarningCardButton = document.getElementById('removeWarningCardButton')
    const warningCard = document.getElementById('warningCard')
    removeWarningCardButton.addEventListener('click', ()=>{
        warningCard.style.display = 'none'
    })
})