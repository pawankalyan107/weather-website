const logMessage = (message) => {
  console.log(message);
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const myLocation = document.querySelector('#myLocation');

const displayLoadingMessage = () => {
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';
};

const displayErrorMessage = (error) => {
  messageOne.textContent = error;
};

const displayWeatherData = (location, forecast, celsius) => {
  messageOne.textContent = location;
  messageTwo.textContent = forecast;
  messageThree.textContent = celsius;
};

const getLocation = () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  myLocation.setAttribute('disabled', 'disabled');
  displayLoadingMessage();

  navigator.geolocation.getCurrentPosition((position) => {
    const location = JSON.stringify({ lat: position.coords.latitude, lon: position.coords.longitude });
    console.log(location);

    fetch(`/currentLocation?location=${location}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          displayErrorMessage(data.error);
        } else {
          displayWeatherData(data.forecast, data.celsius);
        }
      })
      .finally(() => {
        myLocation.removeAttribute('disabled');
      });
  });
};

const getWeather = (location) => {
  displayLoadingMessage();

  fetch('/weather?address=' + location)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        displayErrorMessage(data.error);
      } else {
        displayWeatherData(data.location, data.forecast, data.celsius);
      }
    });
};

myLocation.addEventListener('click', getLocation);

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  getWeather(location);
});
