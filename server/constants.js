// /var/tmp/slides/presentations
const prod = {
  assetsPath: 'https://slides.web.cern.ch',
  uploadsFolder: '/eos/home/s/slides/presentations',
};
const dev = {
  assetsPath: 'http://localhost:3000',
  uploadsFolder: '/Users/aristofanischionis/Desktop/Slides/presentations',
};
const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = config;
