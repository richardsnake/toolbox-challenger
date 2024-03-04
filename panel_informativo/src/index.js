import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/dataStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from './components/dataTable';

ReactDOM.render(
  <Provider store={store}>
    <DataTable />
  </Provider>,
  document.getElementById('root')
);
