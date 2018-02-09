import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux';
import { store, history } from './configureStore';
// import { HashRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import './index.css';

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
