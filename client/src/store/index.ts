import { createStore, applyMiddleware, combineReducers, Action, ActionCreator } from 'redux';
import thunk from 'redux-thunk';

import { imagesReducer, historyReducer, userReducer, loadingReducer, themeReducer } from './reducers';

/**
 * General export for image type
 */
export interface Image {
  alt: string;
  id: string;
  like: boolean;
  src: string;
  title: string;
}

/**
 * General exports for state types
 */
export type HistoryState = Array<string>;
export type ImagesState = Array<Image>;
export type LoadingState = boolean;
export type ThemeState = string;
export type UserState = string | null;

const rootReducer = combineReducers({
  history: historyReducer,
  images: imagesReducer,
  loading: loadingReducer,
  theme: themeReducer,
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

/**
 * Infer the 'RootState', 'AppDispatch', 'AppGetState' types from the store itself
 */
export type AppDispatch = typeof store.dispatch | ActionCreator<Action>;
export type AppGetState = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>

export default store;
