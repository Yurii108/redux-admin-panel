import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './store';

import './styles/index.scss';

function check() {
  const state = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
  }

  console.dir(state)
  
  if (1) {
    return {
      ...state,
      heroesLoadingStatus: 'loading'
    }
  }
}
console.log(check())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

