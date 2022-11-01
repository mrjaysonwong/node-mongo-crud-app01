// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { url, api_key, q, image_type } = require('./api/config');
const fetch = require('node-fetch');

// const User = require('./models/userModel');
const Listing = require('./models/listingModel');

// https://www.pexels.com/video/thailand-4133023

const app = express();
const path = require('path');

const port = 8080;

// mongoose connection
mongoose
  .connect('mongodb://localhost:27017/jaystination')
  .then(() => {
    console.log('Connection open...');
  })
  .catch((err) => {
    console.log('Error');
    console.log(err);
  });

// Static Files
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main-layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

async function callApi() {
  let pixabayUrl = `${url}?${api_key}&q=${q}&image_type=${image_type}`;

  const res = await fetch(pixabayUrl);
  const data = await res.json();

  return data;
}

function getRandomItem(arr) {
  const randomindex = Math.floor(Math.random() * arr.length);
  const item = arr[randomindex];

  return item;
}

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Jaystination' });
});

// view all listings
app.get('/listings', async (req, res) => {
  const data = await callApi();
  const result = getRandomItem(data.hits);

  const listings = await Listing.find({});
  res.render('listings/index', { title: 'All Listings', listings, result });
});

// route for create
app.get('/listings/new', (req, res) => {
  res.render('listings/new', { title: 'New Listing' });
});

// create listing
app.post('/listings', async (req, res) => {
  const newListing = new Listing(req.body);
  await newListing.save();
  res.redirect(`/listings/${newListing.id}`);
});

// show specific listing
app.get('/listings/:id', async (req, res) => {
  const data = await callApi();
  const result = getRandomItem(data.hits);

  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/show', { title: `${listing.name}`, listing, result });
});

// route for edit listing
app.get('/listings/:id/edit', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/edit', { title: 'Edit Listing', listing });
});

// update specific listing
app.patch('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/listings/${listing.id}`);
});

// delete specific listing
app.delete('/listings/:id', async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect('/listings');
});

// Sign Up route
app.get('/signup', (req, res) => {
  res.render('signup', { title: 'Create an account' });
});

// Login route
app.get('/signin', (req, res) => {
  res.render('signin', { title: 'Sign In' });
});

app.get('*', (req, res) => {
  res.render('404', { title: 'Page Not Found' });
});

// Listen on Port 8080
app.listen(port, () => console.info(`App listening on port ${port}`));
