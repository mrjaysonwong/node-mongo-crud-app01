require('dotenv').config();

const apiKey = `${process.env.PIXABAY_API_KEY}`;
// pixabay api url
const url = 'https://pixabay.com/api/';
const api_key = `key=${apiKey}`;
const q = 'tourist+places';
const image_type = 'photo';

exports.apiKey = apiKey;
exports.url = url;
exports.api_key = api_key;
exports.q = q;
exports.image_type = image_type;
