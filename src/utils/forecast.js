const request = require('request');

const tokenDarkSky = '243b5587ac20af3a3e00b42dac8e0f13';

const geocode = (latitude, longitude, callback) => {
  const baseURL = 'https://api.darksky.net/forecast/';
  const paramsDarkSky = '?units=si&lang=en';
  const requestURL = baseURL + tokenDarkSky + '/' + latitude + ',' + longitude + paramsDarkSky;

  request({ url: requestURL, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to forecast services!', undefined);
    } else if (body.error) {
      callback('Unable to fetch forecast for location.', undefined);
    } else {
      const temperature = body.currently.temperature;
      const precpProb = body.currently.precipProbability;
      const summary = body.daily.data[0].summary;

      const forecastString = summary + ` It is currently ${temperature}°C out. There is a ${precpProb}% chance of rain.`;

      callback(undefined, forecastString);
    }
  });
};

module.exports = geocode;