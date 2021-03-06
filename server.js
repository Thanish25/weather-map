if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', async (req, res) => {
    console.log(req.body)
    const lat = req.body.latitude
    const lon = req.body.longitude
    const api_key = WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

    await axios({
      url: url,
      responseType: 'json'
    }).then(data => {
      res.send(data.data)
    })
  
})

app.listen(PORT, () => {
  console.log('server started')
})