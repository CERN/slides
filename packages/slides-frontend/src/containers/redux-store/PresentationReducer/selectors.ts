/**
 * Selectors
 */
import { presentationState } from './definitions';

const getTheme = (state: { presentation: presentationState; }) => state.presentation.theme;
const getTitle = (state: { presentation: presentationState; }) => state.presentation.title;

const getImgUploadRequest = (state: { presentation: presentationState; }) => state.presentation.imgUploadRequest;

const getAssetsPath = (state: { presentation: presentationState; }) => state.presentation.assetsPath;
const getUsername = (state: { presentation: presentationState; }) => state.presentation.username;

const getSaveRequest = (state: { presentation: presentationState; }) => state.presentation.saveRequest;
const getLoadRequest = (state: { presentation: presentationState; }) => state.presentation.loadRequest;

const getIsReady = (state: { presentation: presentationState; }) => state.presentation.isReady;
const getStyleRequest = (state: { presentation: presentationState; }) => state.presentation.styleRequest;

const getBackgroundColor = (state: { presentation: presentationState; }) => state.presentation.backgroundColor;

export {
  getTheme,
  getTitle,
  getImgUploadRequest,
  getAssetsPath,
  getUsername,
  getSaveRequest,
  getLoadRequest,
  getIsReady,
  getStyleRequest,
  getBackgroundColor,
};
