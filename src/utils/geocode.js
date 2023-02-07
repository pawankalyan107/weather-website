const request = require("request");

const geocode = (address, cb) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGF3YW5rYWx5YW4iLCJhIjoiY2xjbjFvMWttN2llbTN2cGp6Z3A1ZzI2YiJ9.mgZKMtjhkgx_MHUNqq6FsA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to location service', undefined)
    } else if (body.features.length === 0) {
      cb('Unable to find the location', undefined)
    } else {
      cb(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
