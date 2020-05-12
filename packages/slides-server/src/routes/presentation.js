import { Router } from 'express';
const zipFolder = require('zip-folder');
const extract = require('extract-zip');
const fs = require('fs-extra');
const { uploadsFolder } = require('../config');

const router = Router();

router.post('/save', (req, res) => {
  // in this endpoint I need to get,
  // username, title, all the state stringified
  // I know where the assets are located
  // so now in the public/username/ folder put: JSON of state, assets folder
  const { state, username } = req.body;
  // sanitize state
  // get state as obj, JSON parsed from frontend
  // FIX STATE SANITIZER
  // const newState = stateSanitizer(state);
  //
  // const obj = JSON.parse(newState);
  const obj = { ...state };
  const { title } = obj.presentation;
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
});

router.post('/load', async (req, res) => { 
  if (req.files === null) {
    return res.status(400).json({
      msg: 'No file uploaded',
    });
  }
  if (!req.body.username) {
    return res.status(400).json({
      msg: 'No username given',
    });
  }
  const { file } = req.files;
  const username = req.body.username;
  const tmpFolder = `${uploadsFolder}/tmp-folder`;
  // check if exists, then do nothing otherwise create
  fs.ensureDirSync(tmpFolder);
  // this name should be unique
  const tmpNameForDotSlides = `${tmpFolder}/${file.md5}_${file.name}`;
  file.mv(tmpNameForDotSlides, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
  // unique name for extract folder distinguised by unique file md5 hash
  const extractFolder = `${uploadsFolder}/extract-folder_id_${file.md5}`;
  // ensure it exists and it is empty
  fs.emptyDirSync(`${extractFolder}/assets`);
  // get the files
  try {
    await extract(tmpNameForDotSlides, { dir: extractFolder });
    // read the JSON
    const reduxStateOBJ = fs.readJsonSync(
      `${extractFolder}/presentation.JSON`,
    );
    // extract title
    const { title } = reduxStateOBJ.presentation;
    // move assets in the user's assets folder
    fs.emptyDirSync(`${uploadsFolder}/${username}/${title}/assets`);
    // copy the images to appropriate folder
    fs.copySync(
      `${extractFolder}/assets`,
      `${uploadsFolder}/${username}/${title}/assets`,
    );
    // return the redux state
    // SANITIZE html in load as well
    res.json({
      state: reduxStateOBJ,
    });
    // delete the extractFolder folder and the file .slides
    fs.removeSync(tmpNameForDotSlides);
    fs.removeSync(extractFolder);
  } catch (err) {
    // handle any errors
    if (err) {
      console.log('An error has occured', err);
      return res.status(500).send(err);
    }
  };
});

router.post('/rename', (req, res) => {
  // take the old and replace it with the new name
  const { username, oldTitle, newTitle } = req.body;
  fs.pathExists(`${uploadsFolder}/${username}/${oldTitle}`).then(oldExists => {
    if (!oldExists) {
      res.status(200).send('Success');
    } else {
      fs.pathExists(`${uploadsFolder}/${username}/${newTitle}`).then(
        newExists => {
          if (!newExists) {
            fs.moveSync(
              `${uploadsFolder}/${username}/${oldTitle}`,
              `${uploadsFolder}/${username}/${newTitle}`,
            );
            res.status(200).send('Success');
          } else {
            res.status(400).send('Already Exists'); // status 400, means that is obvious client's fault
          }
        },
      );
    }
  });
});

export default router;
