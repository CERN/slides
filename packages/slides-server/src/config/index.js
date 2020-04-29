const prod = {
  uploadsFolder: '/mydata/presentations',
};
const dev = {
  uploadsFolder: '/Users/aristofanischionis/Desktop/Slides/presentations',
};
const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = config;
