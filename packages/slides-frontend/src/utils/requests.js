import axios from 'axios';
import { deleteImageFromBackend } from './helperFunctions';

const deletePresentationFolder = (assetsPath, username, title, token) => {
  const url = `${assetsPath}/image/${username}/${title}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const uploadImage = (assetsPath, username, title, files, token) => {
  const url = `${assetsPath}/image/upload`;
  const formData = new FormData();
  formData.set('username', username);
  formData.set('title', title);
  files.forEach(f => formData.append('file', f));
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  };
  return axios.post(url, formData, config);
};

const deleteImage = (assetsPath, username, title, src, token, slidesStringified) => {
  const url = `${assetsPath}/image/${username}/${title}/${src}`;
  // only if it the function return true then delete from backend
  if (deleteImageFromBackend(src, slidesStringified)){
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return;
};

// check if title is good?!
const titleCheck = (assetsPath, username, title, token) => {
  return axios.post(
    `${assetsPath}/presentation/titleCheck`,
    {
      username,
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const uploadPresentation = (assetsPath, username, acceptedFiles, token) => {
  const url = `${assetsPath}/presentation/load`;
  const formData = new FormData();
  formData.append('username', username);
  formData.append('file', acceptedFiles[0]);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  };
  return axios.post(url, formData, config);
};

const renamePresentation = (assetsPath, username, oldTitle, newTitle, token) => {
  return axios.post(
    `${assetsPath}/presentation/rename`,
    {
      username,
      oldTitle,
      newTitle,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const savePresentation = (url, stateStringified, user, token) => {
  return axios.post(
    url,
    {state: JSON.parse(stateStringified), username: user},
    {
      headers: {
        Accept: 'application/slides',
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
    }
  );
};

export {
  deletePresentationFolder,
  uploadImage,
  deleteImage,
  titleCheck,
  uploadPresentation,
  renamePresentation,
  savePresentation,
};
