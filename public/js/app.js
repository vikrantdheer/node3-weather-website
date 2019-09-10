console.log('Client side java script file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From java script'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = 'http://localhost:3001/weather?address=' + search.value

    messageOne.textContent = 'loading.. '
    messageTwo.textContent = ''

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else{
            messageOne.textContent = data.location 
            messageTwo.textContent = data.forecast
        }
    })
})
})