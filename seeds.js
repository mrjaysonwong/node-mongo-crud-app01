const mongoose = require('mongoose');
// const User = require('./models/userModel');
// const Listing = require('./models/listingModel');
const Review = require('./models/reviewModel');

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

// seed data to database for testing.
const r = new Review({
  name: 'Christopher Newman',
  review:
    'In tempora repudiandae aut odit nobis qui illum veritatis eum facere internos non perspiciatis ratione.',
  rating: 5,
});

r.save()
  .then((r) => {
    console.log(r);
  })
  .catch((err) => {
    console.log(err);
  });
