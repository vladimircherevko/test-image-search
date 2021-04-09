import { showError, showInfo } from '../utils/message';
import { request } from '../utils/request';
import { AppGetState, AppDispatch, Image } from './index';
import { ActionTypes as Types } from './types';

/**
 * Redux loading actions
 */
interface ISetLoadingAction {
  type: Types.LOADING_SET;
}
interface IClearLoadingAction {
  type: Types.LOADING_CLEAR;
}

/**
 * Redux theme actions
 */
interface ISetThemeAction {
  payload: string;
  type: Types.THEME_SET;
}
interface IClearThemeAction {
  type: Types.THEME_CLEAR;
}

/**
 * Redux user actions
 */
interface ISetUserAction {
  payload: string;
  type: Types.USER_SET;
}
interface IClearUserAction {
  type: Types.USER_CLEAR;
}

/**
 * Redux history actions
 */
interface IGetHistoryAction {
  payload: Array<string>;
  type: Types.HISTORY_GET;
}
interface ISetHistoryAction {
  payload: string;
  type: Types.HISTORY_SET;
}
interface IClearHistoryAction {
  type: Types.HISTORY_CLEAR;
}

/**
 * Redux images actions
 */
interface IGetImagesAction {
  payload: Array<Image>;
  type: Types.IMAGES_GET;
}
interface IClearImagesAction {
  type: Types.IMAGES_CLEAR;
}
interface ILikeImagesAction {
  payload: string;
  type: Types.IMAGES_LIKE;
}

/**
 * Request response data
 */
interface IResponseDataSearch {
  token?: string;
  images: Array<Image>;
}
interface IResponseDataHistory {
  history: Array<string>;
}

const userKey = 'userData';

type SetLoading = () => ISetLoadingAction;
const setLoading: SetLoading = () => ({ type: Types.LOADING_SET });

type ClearLoading = () => IClearLoadingAction;
const clearLoading: ClearLoading = () => ({ type: Types.LOADING_CLEAR });

/**
 * General export for getUser action
 */
type GetUser = () => (dispatch: AppDispatch) => void;
export const getUser: GetUser = () => (dispatch: AppDispatch) => {
  const token = localStorage.getItem(userKey);
  if (token) {
    dispatch({ payload: token, type: Types.USER_SET });
    dispatch(getHistory());
  }
};

type SetUser = (token: string) => ISetUserAction;
const setUser: SetUser = (token: string) => {
  localStorage.setItem(userKey, token);
  return ({ payload: token, type: Types.USER_SET });
};

/**
 * General export for logout action
 */
type ClearUser = () => (dispatch: AppDispatch) => void;
export const logout: ClearUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem(userKey);
  dispatch({ type: Types.USER_CLEAR });
  dispatch({ type: Types.HISTORY_CLEAR });
  dispatch({ type: Types.IMAGES_CLEAR });
  dispatch({ type: Types.THEME_CLEAR });
};

/**
 * General export for search action
 */
type Search = (keyword: string) => (dispatch: AppDispatch, getState: AppGetState) => void;
export const search: Search = (keyword) => async (dispatch: AppDispatch, getState: AppGetState) => {
  try {
    dispatch(setLoading());
    const token = getState().user;
    const data: IResponseDataSearch = await request('/api/search', 'POST', { keyword }, token);
    if (data.token) {
      dispatch(setUser(data.token));
    }
    dispatch({ payload: data.images, type: Types.IMAGES_GET });
    if (data.images.length) {
      dispatch({ payload: keyword, type: Types.THEME_SET });
      dispatch({ payload: keyword, type: Types.HISTORY_SET });
    } else {
      showInfo('No images found for the entered keyword');
    }
  } catch (err) {
    showError(err.message);
  } finally {
    dispatch(clearLoading());
  }
};

/**
 * General export for setLike action
 */
type SetLike = (imageId: string) => (dispatch: AppDispatch, getState: AppGetState) => void;
export const setLike: SetLike = (imageId) => async (dispatch: AppDispatch, getState: AppGetState) => {
  try {
    dispatch(setLoading());
    const token = getState().user;
    await request('/api/like', 'POST', { imageId }, token);
    dispatch({ payload: imageId, type: Types.IMAGES_LIKE });
  } catch (err) {
    showError(err.message);
  } finally {
    dispatch(clearLoading());
  }
};

type GetHistory = () => (dispatch: AppDispatch, getState: AppGetState) => void;
const getHistory: GetHistory = () => async (dispatch: AppDispatch, getState: AppGetState) => {
  try {
    dispatch(setLoading());
    const token = getState().user;
    const data: IResponseDataHistory = await request('/api/history', 'GET', null, token);
    dispatch({ payload: data.history, type: Types.HISTORY_GET });
  } catch (err) {
    showError(err.message);
  } finally {
    dispatch(clearLoading());
  }
};

/**
 * General exports for action types
 */
export type LoadingActionTypes = ISetLoadingAction | IClearLoadingAction;
export type ThemeActionTypes = ISetThemeAction | IClearThemeAction;
export type UserActionTypes = IClearUserAction | ISetUserAction;
export type HistoryActionTypes = IGetHistoryAction | ISetHistoryAction | IClearHistoryAction;
export type ImagesActionTypes = IGetImagesAction | IClearImagesAction | ILikeImagesAction;
