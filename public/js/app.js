const weatherForm = document.querySelector('form')
const weatherLocation = weatherForm.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = weatherLocation.value

  message1.textContent = 'Loading...'
  message2.textContent = ''

  fetch('http://localhost:3000/weather?address=' + location)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        return message1.textContent = data.error
      }
      message1.textContent =  data.location 
      message2.textContent =  data.forecast
      console.log(data.location)
      console.log(data.forecast)
    })
    .catch(e => console.error(e))
})