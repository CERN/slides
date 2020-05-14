import { Router } from 'express';
const fs = require('fs-extra');
const { resolve } = require('path');
const { uploadsFolder } = require('../config');

const router = Router();

router.post('/upload', (req, res) => {
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
  const imageNameToStore = `${uploadsFolder}/${username}/${title}/assets/${
    file.md5
  }_${file.name}`;
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

router.delete('/:username/:title/:id', (req, res) => {
  const { id, username, title } = req.params;
  const imageName = `${uploadsFolder}/${username}/${title}/assets/${id}`;
  // delete image file
  if (fs.existsSync(imageName)) {
    fs.removeSync(imageName);
    res.json({
      state: 'Successful',
    });
  } else {
    res.status(404).send('File does not exist');
  }
});

router.delete('/:username/:title', (req, res) => {
  console.log("I am in the delete all!!!!!")
  const { username, title } = req.params;
  const userFolder = `${uploadsFolder}/${username}`;
  const presentationFolder = `${userFolder}/${title}`;
  // delete the presentation with title: 'title'
  if (fs.existsSync(presentationFolder)) {
    fs.removeSync(presentationFolder);
    // delete the whole folder 'username' (only if there are no more presentations inside)
    if (fs.emptyDirSync(userFolder)) {
      fs.removeSync(userFolder)
    }
    res.json({
      state: 'Successful',
    });
  } else {
    res.status(404).send('File does not exist');
  }
})

export default router;
