const config = {
    assetsPath: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://slides-backend.web.cern.ch/',
};

export default config; 