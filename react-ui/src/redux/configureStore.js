import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { loadState } from './localStorage';
import { handleWeather, handleFavorites } from './reducers';

export const history = createHistory();
// eslint-disable-next-line
const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(history);
const preloadedState = loadState();

export const appStore = createStore(
  combineReducers({
    handleWeather,
    handleFavorites,
    router: routerReducer
  }),
  preloadedState,
  applyMiddleware(
    routeMiddleware,
    thunkMiddleware,
    loggerMiddleware
  )
)
