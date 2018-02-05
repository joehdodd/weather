import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';

const store = configureStore();

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
