require('dotenv').config();
const {resolve} = require('path');

const prod = {
  uploadsFolder: '/mydata/presentations',
};
const dev = {
  uploadsFolder: resolve(__dirname, '../../Slides-storage/presentations'),
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = config;
