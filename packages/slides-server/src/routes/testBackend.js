import { Router } from 'express';
const router = Router();
const { uploadsFolder } = require('../config');

const { exec } = require('child_process');
function OsFunc() {
  this.execCommand = function(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        callback(error);
        return;
      }
      callback(stdout);
    });
  };
}
const os = new OsFunc();
router.get('/', (req, res) => {
  os.execCommand('ls /', lsroot => {
    os.execCommand('ls .', current =>
      res.status(200).json({
        uploadsFolder,
        currentls: current,
        lsroot,
      }),
    );
  });
});

export default router;
