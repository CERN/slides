/* eslint consistent-return:0 import/order:0 */
require('dotenv-flow').config();
const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const { resolve } = require('path');
// const uuidv4 = require('uuid/v4');
const JSZip = require('jszip');
const fs = require('fs-extra');
const setup = require('./middlewares/frontendMiddleware');
const uploadsFolder = process.env.UPLOADS_FOLDER;
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const fileUpload = require('express-fileupload');
const app = express();
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const { file } = req.files;
  const imageNameToStore = `${uploadsFolder}/assets/${file.md5}-${file.name}`;

  file.mv(imageNameToStore, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      fileName: imageNameToStore,
      filePath: resolve(uploadsFolder, imageNameToStore),
    });
  });
});

// serve static images from folder public/assets
app.use('/static', express.static(`${uploadsFolder}/assets`));
// this is to allow cross origin request and be able to send photos
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Save Endpoint
app.post('/save', (req, res) => {
  if (req.state === null) {
    return res.status(400).json({ msg: 'No redux state given' });
  }
  // in this endpoint I need to get,
  // Presentation UUID, title, all the state stringified
  // I know where the assets are located

  // so now in the public/UUID/ folder put: JSON of state, assets folder
  // save this in public/user/UUID
  // Presentation UUID
  // const id = uuidv4();
  const { state } = req.body;
  const obj = JSON.parse(state);
  const { username, title } = obj.global;
  const presentationName = `${uploadsFolder}/${username}/${title}`;
  const presentationFile = `${presentationName}/presentation.JSON`;
  // writes the file and creates the folders if needed
  //
  // .then(() => fs.readJson(presentationFile))
  fs.outputJsonSync(presentationFile, obj);
  // .then(() => {
  //   console.log('JSON Saved!');
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  // copy assets folder
  fs.copySync(`${uploadsFolder}/assets`, `${presentationName}/assets`);
  // .then(() => {
  //   console.log('Assets folder moved!');
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  // zip it and rename
  const zip = new JSZip();
  // zip.file("file", content);
  // ... and other manipulations
  zip.folder(`${presentationName}`);
  zip
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(`${uploadsFolder}/${username}/${title}.slides`))
    .on('finish', () => {
      // JSZip generates a readable stream with a "end" event,
      // but is piped here in a writable stream which emits a "finish" event.
      console.log(`${uploadsFolder}/${username}/${title}.slides written.`);
    });
  res.json({
    fileName: presentationFile,
    filePath: presentationName,
  });
});

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
