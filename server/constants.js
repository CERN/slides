const ip = require('ip');
const port = 3000;

const prod = {
  assetsPath: 'https://slides.web.cern.ch',
};
const dev = {
  assetsPath: 'http://194.12.160.40:3000',
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
