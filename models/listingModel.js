const mongoose = require('mongoose');
const moment = require('moment');

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
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: () => moment().format('MMM-D-YYYY'),
  },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
