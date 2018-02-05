import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { loadState } from './localStorage';
import handleWeather from './reducers/reducers';

export const history = createHistory();
const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(history);
const preloadedState = loadState();

export const store = createStore(
  combineReducers({
    handleWeather,
    router: routerReducer
  }),
  preloadedState,
  applyMiddleware(
    routeMiddleware,
    thunkMiddleware,
    loggerMiddleware
  )
)
