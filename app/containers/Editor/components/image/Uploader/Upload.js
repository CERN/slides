import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Progress, Icon, Message } from 'semantic-ui-react';
// import Notifications, { notify } from 'react-notify-toast';
import Dropzone from './Dropzone';
import { uploadImageRequest } from '../../../redux-store/actions';
import { selectPendingImageUploadRequests } from '../../../redux-store/selectors';

import './Upload.css';
const timeoutLength = 2500;

// check where can i store the images
export function Upload({ onImageRequest, uploadRequests }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);
  // const toast = notify.createShowQueue();
  const [err, setErr] = useState('');
  const [time, setTime] = useState();

  const onFilesAdded = f => {
    setFiles(files.concat(f));
  };

  useEffect(() => {
    if (uploadRequests === 1) uploadFiles();
  }, [uploadRequests]);

  const errorHandling = msg => {
    setSuccessfullUploaded(false);
    setUploading(false);
    setFiles([]);
    setErr(msg);
    setTime(
      setTimeout(() => {
        setErr(false);
      }, 999999999),
    );
  };

  const uploadFiles = async () => {
    setUploadProgress({});
    setUploading(true);
    const promises = [];
    // check how many files are to be uploaded
    if (files.length > 3) {
      errorHandling('Only 3 images can be uploaded at a time');
      return;
    }

    // file types to be accepted
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    files.forEach(file => {
      // #2 Catching wrong file types on the client
      if (types.every(type => file.type !== type)) {
        errorHandling(`'${file.type}' is not a supported format`);
        return;
      }

      // #3 Catching files that are too large on the client
      if (file.size > 150000) {
        errorHandling(
          `'${file.name}' is too large, please pick a smaller file`,
        );
        return;
      }
      // now it's good to send the request
      if (file) promises.push(sendRequest(file));
    });

    try {
      await Promise.all(promises);
      setSuccessfullUploaded(true);
      setUploading(false);
      console.log('Successfully managed to upload files');
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      console.log('Something went Wrong while tryingto satisfy the Promises');
      setSuccessfullUploaded(true);
      setUploading(false);
    }
  };

  const sendRequest = file =>
    new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100,
          };
          setUploadProgress(copy);
        }
      });

      req.upload.addEventListener('load', e => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: 'done', percentage: 100 };
        setUploadProgress(copy);
        resolve(req.response);
      });

      req.upload.addEventListener('error', e => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: 'error', percentage: 0 };
        setUploadProgress(copy);
        reject(req.response);
      });

      const formData = new FormData();
      formData.append('file', file, file.name);

      req.open('POST', 'http://localhost:3000/upload');
      req.send(formData);
    });

  const renderProgress = file => {
    const progress = uploadProgress[file.name];
    if (uploading || successfullUploaded) {
      return (
        //
        <div className="ProgressWrapper">
          <Progress percent={progress ? progress.percentage : 0} indicating />
          <Icon
            name="check circle"
            // style={{
            //   opacity:
            //     uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0,
            // }}
          />
        </div>
      );
    }
  };

  const renderActions = () => {
    if (successfullUploaded) {
      return (
        <Button
          content="Clear"
          onClick={() => {
            setFiles([]);
            setSuccessfullUploaded(false);
          }}
        />
      );
    }
    return (
      <Button
        content="Upload"
        disabled={files.length < 0 || uploading}
        onClick={uploadFiles}
      />
    );
  };
  // I do this and include redux

  return (
    <div className="Upload">
      {/* <Notifications /> */}
      {/* {err && ( */}
      <div className="error-message">
        <Message error hidden={err === ''} size="mini">
          <Message.Header content="Unable to perform the Upload" />
          <p>{err}</p>
        </Message>
      </div>
      {/* )} */}
      <div className="Content">
        <div>
          <Dropzone
            onFilesAdded={onFilesAdded}
            disabled={uploading || successfullUploaded}
          />
        </div>
        <div className="Files">
          {files.map(file => (
            <div key={file.name} className="Row">
              <span className="Filename">{file.name}</span>
              {renderProgress(file)}
            </div>
          ))}
        </div>
      </div>
      <div className="Actions">{renderActions()}</div>
    </div>
  );
}

Upload.propTypes = {
  onImageRequest: PropTypes.func,
  uploadRequests: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
  return {
    onImageRequest: () => dispatch(uploadImageRequest(-1)),
  };
}

export default connect(
  state => ({
    uploadRequests: selectPendingImageUploadRequests(state),
  }),
  mapDispatchToProps,
)(Upload);
