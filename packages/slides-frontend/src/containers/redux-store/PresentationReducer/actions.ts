import {
  SET_THEME,
  SET_TITLE,
  IMAGE_UPLOAD_REQUEST,
  SET_ASSETS_PATH,
  SAVE_REQUEST,
  LOAD_REQUEST,
  LOAD_STATE,
  IS_READY,
  STYLE_REQUEST,
  BACKGROUND_COLOR,
  THEME_REQUEST,
  PRESENTATION_MODE,
} from './constants';

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  theme,
}) as const;

export const setTitle = (title: string) => ({
  type: SET_TITLE,
  title,
}) as const;

export const uploadImageRequest = (request: boolean) => ({
  type: IMAGE_UPLOAD_REQUEST,
  request,
}) as const;

export const setAssetsPath = (path: string) => ({
  type: SET_ASSETS_PATH,
  path,
}) as const;

export const setSaveRequest = (request: boolean) => ({
  type: SAVE_REQUEST,
  request,
}) as const;

export const setLoadRequest = (request: boolean) => ({
  type: LOAD_REQUEST,
  request,
}) as const;

// this is a presentation as an object
export const loadState = (state: any) => ({
  type: LOAD_STATE,
  state,
}) as const;

export const setIsReady = (ready: boolean) => ({
  type: IS_READY,
  ready,
}) as const;

export const setStyleRequest = (request: boolean) => ({
  type: STYLE_REQUEST,
  request,
}) as const;

export const setBackgroundColor = (color: string) => ({
  type: BACKGROUND_COLOR,
  color,
}) as const;

export const themeRequest = (request: boolean) => ({
  type: THEME_REQUEST,
  request,
}) as const;

export const setPresentationMode = (mode: boolean) => ({
  type: PRESENTATION_MODE,
  mode,
}) as const;

export type Action = ReturnType<
  typeof setTheme | typeof setTitle |
  typeof uploadImageRequest | typeof setAssetsPath | typeof themeRequest |
  typeof setSaveRequest | typeof setLoadRequest | typeof loadState |
  typeof setIsReady | typeof setStyleRequest | typeof setBackgroundColor |
  typeof setPresentationMode
>
