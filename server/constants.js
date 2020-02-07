const prod = {
  assetsPath: 'https://slides.web.cern.ch',
};
const dev = {
  assetsPath: 'http://souvlaki:3000',
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
