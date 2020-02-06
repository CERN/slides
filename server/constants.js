const prod = {
  assetsPath: 'https://slides.web.cern.ch/static',
};
const dev = {
  assetsPath: 'http://souvlaki:3000/static',
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
