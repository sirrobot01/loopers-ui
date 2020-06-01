import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import Loopers from './components/loop'



ReactDOM.render(
  <React.StrictMode>
    <Loopers />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
