const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
