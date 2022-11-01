const mongoose = require('mongoose');
// const User = require('./models/userModel');
const Listing = require('./models/listingModel');

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

// // seed data to database for testing.
// const l = new Listing({
//   name: 'Maple Camp',
//   price: 1500,
//   description: 'lorem test',
//   location: 'Baguio City, Philippines',
// });

// l.save()
//   .then((u) => {
//     console.log(u);
//   })
//   .catch((err) => {
//     console.log(err);
//   });