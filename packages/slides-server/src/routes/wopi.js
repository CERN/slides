import { Router } from 'express';
const wopiServerFiles = 'http://localhost:8443/wopi/files/';
const axios = require('axios');

const router = Router();

router.get('/phoenix/wopi/start', (req, res) => {
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
});

// router.get('/phoenix/wopi/save', (req, res) => { });
// router.get('/phoenix/wopi/load', (req, res) => { });

export default router;
