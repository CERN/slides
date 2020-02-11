/* eslint consistent-return:0 import/order:0 */
require('dotenv-flow').config();
const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const { resolve } = require('path');
// const uuidv4 = require('uuid/v4');
const zipFolder = require('zip-folder');
const extract = require('extract-zip');
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
app.use('/cernlogo', express.static(`${uploadsFolder}/cernLogo`));

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
  // if (req.state === null) {
  //   return res.status(400).json({ msg: 'No redux state given' });
  // }
  // in this endpoint I need to get,
  // username, title, all the state stringified
  // I know where the assets are located
  // so now in the public/username/ folder put: JSON of state, assets folder
  const { state } = req.body;
  const obj = JSON.parse(state);
  const { username, title } = obj.global;
  const presentationName = `${uploadsFolder}/${username}/${title}`;

  const tmp = `${uploadsFolder}/${username}/tmp`;
  const presentationFile = `${tmp}/presentation.JSON`;
  //
  try {
    // writes the file and creates the folders if needed
    fs.outputJsonSync(presentationFile, obj);
    // copy assets folder
    fs.copySync(`${uploadsFolder}/assets`, `${tmp}/assets`);
    // zip it and rename
    zipFolder(`${tmp}`, `${presentationName}.slides`, err => {
      if (!err) {
        console.log('Saved successfully!');
        // delete the folder now that I have the .slides
        // delete the tmp
        fs.removeSync(tmp);
        res.json({
          fileName: `${presentationName}.slides`,
          filePath: `${presentationName}`,
        });
      }
    });
  } catch (e) {
    console.log('An error occured ', e);
    res.json({
      error: e,
    });
  }
});

app.post('/load', (req, res) => {
  // if (req.data === null) {
  //   return res.status(400).json({ msg: 'No redux state given' });
  // }

  const { data } = req.body;
  const { username, title } = data;
  const presentationName = `${uploadsFolder}/${username}/${title}.slides`;
  const extractFolder = `${uploadsFolder}/${username}/${title}/tmp`;
  // check if i need to create this folder first
  extract(presentationName, { dir: extractFolder }, err => {
    if (err) {
      console.log('An error has occured', err);
    } else {
      console.log(
        "The presentation is extracted let's read it, it is located in: ",
        extractFolder,
      );
      // move assets in the common assets folder
      fs.copySync(`${extractFolder}/assets`, `${uploadsFolder}/assets`);
      // update react state with the JSON file
      // read the JSON
      const reduxStateOBJ = fs.readJsonSync(
        `${extractFolder}/presentation.JSON`,
      );
      console.log('reduxStateOBJ', reduxStateOBJ);
      // see how I can write it in redux state
      // probably I can return the obj in the response
      res.json({
        state: reduxStateOBJ,
      });
    }
  });
  // delete the extractFolder folder
  fs.removeSync(extractFolder);
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
