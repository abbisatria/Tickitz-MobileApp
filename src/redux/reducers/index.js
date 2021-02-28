import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import authReducer from './auth';
import movieReducer from './movie';
import orderReducer from './order';
import showtimeReducer from './showtime';
import genreReducer from './genre';
import cinemaReducer from './cinema';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const orderConfig = {
  key: 'order',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  movie: movieReducer,
  order: persistReducer(orderConfig, orderReducer),
  showtime: showtimeReducer,
  genre: genreReducer,
  cinema: cinemaReducer,
});

export default reducer;
