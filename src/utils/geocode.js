const request = require('request')

const geocode = (address, callback) => {

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWxhbi1qaHUiLCJhIjoiY2p6MTBieTVzMDZkeDNtcW9mbDdhbDRzcCJ9.ZCSVCR4x5llVLrbcQWnxRg'

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to geocode service', undefined)
      return;
    }
    if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
      return;
    }
    const [lontitude, latitude] = response.body.features[0].center
    const location = response.body.features[0].place_name

    callback(undefined, { lontitude, latitude, location })
  })

}

module.exports = geocode