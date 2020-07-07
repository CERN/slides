require('dotenv').config();

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';
const fileUpload = require('express-fileupload');

/* AUTHENTICATION */
// Add : ​"keycloak-connect": "10.0.0" to package.json
// const session = require('express-session');
const Keycloak = require('keycloak-connect');
const passedAuth = require('./utils/log');

if (!process.env.KEYCLOAK_REALM) {
  console.log('KEYCLOAK_REALM environment variable has no value');
  process.exit(1);
}
if (!process.env.KEYCLOAK_URL) {
  console.log('KEYCLOAK_URL environment variable has no value');
  process.exit(1);
}
if (!process.env.KEYCLOAK_CLIENT_ID) {
  console.log('KEYCLOAK_CLIENT_ID environment variable has no value');
  process.exit(1);
}
if (!process.env.KEYCLOAK_CLIENT_SECRET) {
  console.log('KEYCLOAK_CLIENT_SECRET environment variable has no value');
  process.exit(1);
}

const kcUserConf = {
  realm: process.env.KEYCLOAK_REALM,
  serverUrl: process.env.KEYCLOAK_URL,
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
};

//user auth
let userKeycloak = new Keycloak({}, kcUserConf);

// const memoryStore = new session.MemoryStore();
// const keycloak = new Keycloak({ store: memoryStore });
/* END AUTH */
const {uploadsFolder} = require('./config');

const app = express();

app.use(cors());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Application-Level Middleware
app.use(userKeycloak.middleware());
// serve static images from the uploads folder
// I don't use userKeycloak.protect() here, so the pictures are open to the public
app.use('/static', express.static(uploadsFolder));
// serve Slides' assets
app.use('/public', express.static(`${__dirname}/../public`));
// Routes

app.use('/image', userKeycloak.protect(), passedAuth, routes.image);
app.use('/presentation', userKeycloak.protect(), passedAuth, routes.presentation);
app.use('/test', userKeycloak.protect(), passedAuth, routes.testBackend);
// app.use('/wopi', routes.wopi);

// Start
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
