import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux';
import { appStore, history } from './configureStore';
import { ConnectedRouter } from 'react-router-redux';
import './index.css';

appStore.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(appStore.getState()))
})

ReactDOM.render(
  <Provider store={appStore}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
