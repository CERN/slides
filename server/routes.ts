const uploadsFolder = `${process.cwd()}/public`;
const { resolve } = require('path');
const zipFolder = require('zip-folder');
const extract = require('extract-zip');
const fs = require('fs-extra');

module.exports.imageUpload = function(req, res) {
  if (req.files === null) {
    return res.status(400).json({
      msg: 'No file uploaded',
    });
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
};

module.exports.savePresentation = function(req, res) {
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
        // console.log('Saved successfully!');
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
    return res.status(500).send(e);
  }
};

module.exports.loadPresentation = function(req, res) {
  if (req.files === null) {
    return res.status(400).json({
      msg: 'No file uploaded',
    });
  }
  const { file } = req.files;
  const extractFolder = `${uploadsFolder}/extract-folder`;
  const tmpFolder = `${uploadsFolder}/tmp-folder`;
  fs.emptyDirSync(tmpFolder);
  const tmpNameForDotSlides = `${tmpFolder}/${file.md5}-${file.name}`;
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
      res.json({
        state: reduxStateOBJ,
      });
      // delete the extractFolder folder
      fs.removeSync(tmpFolder);
      fs.removeSync(extractFolder);
    },
  );
}

module.exports.deleteImage = function(req, res) {
  const imageName = `${uploadsFolder}/assets/${req.params.id}`;
  // delete image file
  fs.removeSync(imageName);
  res.json({
    state: 'Successful',
  });
}
