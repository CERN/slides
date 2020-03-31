/* eslint-disable func-names */
const uploadsFolder = process.env.UPLOADS_FOLDER;
const { resolve } = require('path');
const zipFolder = require('zip-folder');
const extract = require('extract-zip');
const fs = require('fs-extra');
const axios = require('axios');
const sanitizeHtml = require('sanitize-html');
const wopiServerFiles = 'http://localhost:8443/wopi/files/';

// const stateSanitizer = stateObj =>
//   stateObj.deck.slides.forEach(slide => {
//     slide.itemsArray.forEach(item => {
//       if (item.type === 'TEXT') {
//         const newItem = { ...item };
//         newItem.Data = sanitizeHtml(item.Data);
//         return newItem;
//       }
//       return item;
//     });
//   });

module.exports.imageUpload = function(req, res) {
  if (req.files === null) {
    return res.status(400).json({
      msg: 'No file uploaded',
    });
  }
  // uploadsfolder/user/presentationName/assets/hash_filename
  const { file } = req.files;
  const { username, title } = req.body;
  // this makes the dir if it doesn't exist else does nothing
  fs.ensureDirSync(`${uploadsFolder}/${username}/${title}/assets`);
  const imageNameToStore = `${uploadsFolder}/${username}/${title}/assets/${file.md5}_${file.name}`;
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
};

module.exports.deleteImage = function(req, res) {
  const { id, username, title } = req.params;
  const imageName = `${uploadsFolder}/${username}/${title}/assets/${id}`;
  // delete image file
  fs.removeSync(imageName);
  res.json({
    state: 'Successful',
  });
};

module.exports.savePresentation = function(req, res) {
  // in this endpoint I need to get,
  // username, title, all the state stringified
  // I know where the assets are located
  // so now in the public/username/ folder put: JSON of state, assets folder
  const { state } = req.body;
  // sanitize state
  // get state as obj, JSON parsed from frontend
  // FIX STATE SANITIZER
  // const newState = stateSanitizer(state);
  //
  // const obj = JSON.parse(newState);
  const obj = { ...state };
  const { username, title } = obj.presentation;
  const presentationName = `${uploadsFolder}/${username}/${title}`;

  const tmp = `${uploadsFolder}/${username}/${title}/tmp`;
  const presentationFile = `${tmp}/presentation.JSON`;
  //
  try {
    // writes the file and creates the folders if needed
    fs.outputJsonSync(presentationFile, obj);
    // check if the assets folder exists, if not it is created
    fs.ensureDirSync(`${uploadsFolder}/${username}/${title}/assets`);
    // copy assets folder
    fs.copySync(
      `${uploadsFolder}/${username}/${title}/assets`,
      `${tmp}/assets`,
    );
    // zip it and rename
    zipFolder(`${tmp}`, `${presentationName}.slides`, err => {
      if (!err) {
        // delete the tmp now that I have the file
        fs.removeSync(tmp);
        // i need to read the zip
        const fileAsBuffer = fs.readFileSync(`${presentationName}.slides`);
        // send the file
        res.send(fileAsBuffer);
        // delete the file from server
        fs.removeSync(`${presentationName}.slides`);
      }
    });
  } catch (e) {
    console.log('An error occured ', e);
    return res.status(500).send(e);
  }
};
// fix load
module.exports.loadPresentation = function(req, res) {
  if (req.files === null) {
    return res.status(400).json({
      msg: 'No file uploaded',
    });
  }
  const { file } = req.files;
  // i have to get an identifier for this particular action
  // IMPORTANT because it can interfere with someone else trying to load a presentation in the same time
  const extractFolder = `${uploadsFolder}/extract-folder`;
  const tmpFolder = `${uploadsFolder}/tmp-folder`;
  fs.emptyDirSync(tmpFolder);
  const tmpNameForDotSlides = `${tmpFolder}/${file.md5}_${file.name}`;
  file.mv(tmpNameForDotSlides, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
  // check if i need to create this folder first
  fs.emptyDirSync(`${extractFolder}/assets`);
  extract(
    tmpNameForDotSlides,
    {
      dir: extractFolder,
    },
    err => {
      if (err) {
        console.log('An error has occured1', err);
        return res.status(500).send(err);
      }
      // move assets in the common assets folder
      fs.emptyDirSync(`${uploadsFolder}/assets`);
      fs.copySync(`${extractFolder}/assets`, `${uploadsFolder}/assets`);
      // read the JSON
      const reduxStateOBJ = fs.readJsonSync(
        `${extractFolder}/presentation.JSON`,
      );
      // return the redux state
      // sanitize html in load as well
      res.json({
        state: stateSanitizer(reduxStateOBJ),
      });
      // delete the extractFolder folder
      fs.removeSync(tmpFolder);
      fs.removeSync(extractFolder);
    },
  );
};

module.exports.wopiStart = function(req, res) {
  const { accessToken, inode, username } = req.query;
  console.log('accessToken and inode ', accessToken, inode);
  // accessToken, inode, username
  // now i have to make the getfile info, getfile wopi requests, and after that i set all the parameters like the redux state and images and im ready to roll
  // getfile info:
  const getFileInfoURL = `${wopiServerFiles}${inode}?access_token=${accessToken}`;
  const getFileURL = `${wopiServerFiles}${inode}/contents?access_token=${accessToken}`;
  // lock, uuid, conflict
  // put
  // unlock
  // `X-WOPI-${SessionContext}`
  // const wopi_header = 'X-WOPI-Override';
  axios
    .get(getFileInfoURL)
    .then(resp => {
      console.log('getFileInfoURL returned me:', resp.response);
    })
    .catch(e => {
      console.log('error is', e.response);
    });
};

// module.exports.wopiSave = function(req, res) {};

// module.exports.wopiLoad = function(req, res) {};
