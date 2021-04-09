import { UserState, LoadingState, ImagesState, HistoryState, ThemeState } from './index';
import {
  UserActionTypes, HistoryActionTypes, LoadingActionTypes, ImagesActionTypes, ThemeActionTypes
} from './actions';
import { ActionTypes as Types } from './types';

export const userReducer = (state: UserState = null, action: UserActionTypes) => {
  switch (action.type) {
    case Types.USER_SET: {
      return action.payload;
    }
    case Types.USER_CLEAR: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const loadingReducer = (state: LoadingState = false, action: LoadingActionTypes) => {
  switch (action.type) {
    case Types.LOADING_SET: {
      return true;
    }
    case Types.LOADING_CLEAR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export const themeReducer = (state: ThemeState = '', action: ThemeActionTypes) => {
  switch (action.type) {
    case Types.THEME_SET: {
      return action.payload;
    }
    case Types.THEME_CLEAR: {
      return '';
    }
    default: {
      return state;
    }
  }
};

export const historyReducer = (state: HistoryState = [], action: HistoryActionTypes) => {
  switch (action.type) {
    case Types.HISTORY_GET: {
      return action.payload;
    }
    case Types.HISTORY_SET: {
      if (state.includes(action.payload)) {
        return [ ...state.filter(keyword => keyword !== action.payload), action.payload ];
      }
      return [ ...state, action.payload ];
    }
    case Types.HISTORY_CLEAR: {
      return [];
    }
    default: {
      return state;
    }
  }
};

export const imagesReducer = (state: ImagesState = [], action: ImagesActionTypes) => {
  switch (action.type) {
    case Types.IMAGES_GET: {
      return action.payload;
    }
    case Types.IMAGES_LIKE: {
      return state.map(img => {
        if (img.id === action.payload) {
          img.like = true;
        }
        return img;
      });
    }
    case Types.IMAGES_CLEAR: {
      return [];
    }
    default: {
      return state;
    }
  }
};
