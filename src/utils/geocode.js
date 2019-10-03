const request = require('request');

const tokenMapBox = 'pk.eyJ1IjoibHVwY2FzIiwiYSI6ImNrMTA4Y210NzAyNG0zbnB3bHp5dDdqMXYifQ.Oso2fZs7Bpj2xkNh-8jMzA';

const forecast = (address, callback) => {
  const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  address = encodeURIComponent(address);
  const requestURL = baseURL + address + '.json?limit=1&access_token=' + tokenMapBox;

  request({ url: requestURL, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;

      callback(undefined, {latitude, longitude, location});
    }
  });
};

module.exports = forecast;