import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Importa thunk directamente, no como default
import dataReducer from '../reducers/dataReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  // otros reducers si los hay
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Aplica thunk aquí
);

export default store;
