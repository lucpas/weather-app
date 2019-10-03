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
      const currTemp = body.currently.temperature;
      const minTemp = body.daily.data[0].temperatureMin;
      const maxTemp = body.daily.data[0].temperatureMax;
      const precpProb = body.daily.data[0].precipProbability * 100;
      const summary = body.daily.data[0].summary;

      const forecastString = summary + ` It is currently ${currTemp}°C out.\nThere is a ${precpProb}% chance of rain today, with temperatures ranging from ${minTemp}°C to ${maxTemp}°C.`;

      callback(undefined, forecastString);
    }
  });
};

module.exports = geocode;