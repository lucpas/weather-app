const fetchWeather = address =>
  fetch(`/weather?address=${address}`).then(response =>
    response.json()
  );
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const location = search.value;
  fetchWeather(location).then(weather => {
    if (weather.error) {
      messageOne.textContent = weather.error;
      messageTwo.textContent = '';
    } else {
      messageOne.textContent = weather.location;
      messageTwo.textContent = weather.forecast;
    }
  });
});
