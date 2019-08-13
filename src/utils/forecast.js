
const request = require('request')

const forecast = ({ latitude, lontitude }, callback) => {
  const url = `https://api.darksky.net/forecast/7316c29c0c362eedcf1f0a0ce227a29e/${latitude},${lontitude}?units=si`

  console.log(url, 'url')

  request({ url: url, json: true }, (error, response) => {
  if (error) {
    callback('Unable to connect to whether service', undefined)
    return;
  }
  if (response.body.error) {
    callback('Unable to find the loaction', undefined)
    return;
  }
  const data = response.body
  callback(undefined ,data.daily.summary + ' It is currently ' + data.currently.temperature + ' degrees out. This high today is ' + data.daily.data[0].temperatureHigh + ' with a low of '+ data.daily.data[0].temperatureLow +'. There is a ' + data.currently.precipProbability + '% chance of rain.')
})
}

module.exports = forecast