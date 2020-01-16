export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://slides.web.cern.ch'
    : 'http://localhost:3000';
