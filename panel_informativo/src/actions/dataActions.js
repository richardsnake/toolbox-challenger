import axios from 'axios';
import mockData from '../data/mockData.json';
// Action Type
export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// URL de tu API mock
const API_URL = 'http://localhost:3000/files/data';

// Action Creators
export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN
});

export const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: { data }
});

export const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: { error }
});

// Thunk para obtener los datos
export function fetchData() {
  return dispatch => {
    dispatch(fetchDataBegin());
    return axios.get(API_URL)
      .then(response => {
        console.log(response);
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error));
      });
  };
} 


/* 
export function fetchData() {
    return dispatch => {
      dispatch(fetchDataBegin());
      // Simula una llamada a la API con un retardo
      setTimeout(() => {
        dispatch(fetchDataSuccess(mockData));
        // Si necesitas simular un error, puedes usar:
        // dispatch(fetchDataFailure(new Error('An error occurred')));
      }, 500);
    };
  } */

