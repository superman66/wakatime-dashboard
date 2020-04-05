import React from 'react';
import ReactDOM from 'react-dom';
import ready from './ready';
import App from './App';

import './styles/index.less';

const hotRender = Component => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

ready(() => {
  // hotRender(hot(module)(App));
  ReactDOM.render(<App />, document.getElementById('root'));
});
