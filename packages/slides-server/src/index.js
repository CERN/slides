// require('dotenv').config();

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';
const fileUpload = require('express-fileupload');

/* AUTHENTICATION */
// Add : ​"keycloak-connect": "10.0.0" to package.json
// const session = require('express-session');
// const Keycloak = require('keycloak-connect');

// const memoryStore = new session.MemoryStore();
// const keycloak = new Keycloak({ store: memoryStore });
/* END AUTH */
const { uploadsFolder } = require('./config');

const app = express();

// Application-Level Middleware
// Auth
// app.use(keycloak.middleware());

app.use(cors());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// serve static images from the uploads folder
app.use('/static', express.static(uploadsFolder));

// this is to allow cross origin requests, will have to be changed, it is DANGEROUS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Routes

app.use('/image', routes.image);
app.use('/presentation', routes.presentation);
app.use('/test', routes.testBackend);
app.use('/wopi', routes.wopi);

// Start
const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}!`),
);
