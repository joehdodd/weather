/* eslint-disable */
import {
  FETCHING,
  ERROR,
  SET_ADDR,
  SET_POSITION,
  SUCCESS,
  IS_FAV,
  SAVE_FAV,
  REM_FAV
} from './actions.js';

export function handleWeather(
  state = {
    fetching: true
  },
  action
) {
  switch (action.type) {
    case FETCHING:
      return { ...state, fetching: action.fetching };
    case ERROR:
      return { ...state, notFound: action.notfound };
    case SET_ADDR:
      return { ...state, address: action.address };
    case SET_POSITION:
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      };
    case SUCCESS:
      return {
        ...state,
        notFound: action.notfound,
        fetching: action.fetching,
        data: action.data
      };
    default:
      return state;
  }
}

export function handleFavorites(
  state = {
    favorites: [],
    isFavorite: false
  },
  action
) {
  switch (action.type) {
    case IS_FAV:
      return {
        ...state,
        isFavorite: state.favorites.some(fav => fav.address === action.address)
      };
    case SAVE_FAV:
      return {
        ...state,
        favorites: [
          { address: action.address, lat: action.lat, lng: action.lng },
          ...state.favorites
        ]
      };
    case REM_FAV:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.address !== action.address)
      };
    default:
      return state;
  }
}
