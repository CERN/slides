exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://slides.web.cern.ch'
    : 'http://localhost:3000';
