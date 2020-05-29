/**
 * Selectors
 */
import { presentationState } from './definitions';

const getTheme = (state: { presentation: presentationState; }) => state.presentation.theme;
const getTitle = (state: { presentation: presentationState; }) => state.presentation.title;

const getImgUploadRequest = (state: { presentation: presentationState; }) => state.presentation.imgUploadRequest;

const getAssetsPath = (state: { presentation: presentationState; }) => state.presentation.assetsPath;

const getSaveRequest = (state: { presentation: presentationState; }) => state.presentation.saveRequest;
const getLoadRequest = (state: { presentation: presentationState; }) => state.presentation.loadRequest;

const getIsReady = (state: { presentation: presentationState; }) => state.presentation.isReady;
const getStyleRequest = (state: { presentation: presentationState; }) => state.presentation.styleRequest;

const getBackgroundColor = (state: { presentation: presentationState; }) => state.presentation.backgroundColor;
const getThemeRequest = (state: { presentation: presentationState; }) => state.presentation.themeRequest;
const getPresentationMode = (state: { presentation: presentationState; }) => state.presentation.presentationMode;

export {
  getTheme,
  getTitle,
  getImgUploadRequest,
  getAssetsPath,
  getSaveRequest,
  getLoadRequest,
  getIsReady,
  getStyleRequest,
  getBackgroundColor,
  getThemeRequest,
  getPresentationMode,
};
