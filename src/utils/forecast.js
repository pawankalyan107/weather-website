const request = require('request')

const forecast = (latitude, longitude, cb) => {
  const url = "http://api.weatherstack.com/current?access_key=d09dc3d14534a42f337f38f19e63f956&query=" + latitude + "," + longitude + "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to weather service!", undefined)
    } else if (body.error) {
      cb('Unable to find location', undefined)
    } else {
      const currentWeather = body.current;
      cb(undefined, `${currentWeather.weather_descriptions[0]} It is currently ${currentWeather.temperature} degrees out. it feels like ${currentWeather.feelslike} degrees out.`)
    }
  })
}

module.exports = forecast