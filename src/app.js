const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars views and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'lucpas'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'lucpas'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'lucpas',
    message: 'Have you tried turning it off and on again?'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({ error: 'You must provide an address' });
    return;
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({ error });
        return;
      }

      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          res.send({ error });
          return;
        }

        res.send({ forecast, location, address: req.query.address });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({ error: 'You must provide a search term' });
    return;
  }

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Robot',
    message: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Robot',
    message: 'Page not found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is up on port 3000');
});
