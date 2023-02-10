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
      const fahrenheitData = `${currentWeather.weather_descriptions[0]} It is currently ${currentWeather.temperature} degree fahrenheit out. it feels like ${currentWeather.feelslike} degrees fahrenheit out.`
      const celsiusData = `${currentWeather.weather_descriptions[0]} It is currently ${((currentWeather.temperature - 32) * 5 / 9).toFixed()} degree celsius out. it feels like ${((currentWeather.feelslike - 32) * (5 / 9)).toFixed()} degrees celsius out. Humidity is ${currentWeather.humidity}`
      cb(undefined, fahrenheitData, celsiusData)
    }
  })
}

module.exports = forecast