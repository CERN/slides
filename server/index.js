require('dotenv-flow').config();
const express = require('express');
const cors = require('cors');
const { resolve } = require('path');
const isDev = process.env.NODE_ENV !== 'production';
// eslint-disable-next-line import/order
const argv = require('./argv');
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const fileUpload = require('express-fileupload');
const logger = require('./logger');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
// const uploadsFolder = process.env.UPLOADS_FOLDER;
const uploadsFolder = `${process.cwd()}/public`;
const api = require('./routes');

const app = express();
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// serve static images from folder public/assets
app.use('/static', express.static(`${uploadsFolder}/assets`));
app.use('/cernlogo', express.static(`${uploadsFolder}/cernLogo`));

// this is to allow cross origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// --------------------------- API ENDPOINTS ---------------------------
// Upload Endpoint
app.post('/upload', (req, res) => api.imageUpload(req, res));
// Save Endpoint
app.post('/save', (req, res) => api.savePresentation(req, res));
// Load Endpoint
app.post('/load', (req, res) => api.loadPresentation(req, res));
// Remove Image Endpoint
app.delete('/image/:id', (req, res) => api.deleteImage(req, res));
// --------------------------- API ENDPOINTS ---------------------------

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
