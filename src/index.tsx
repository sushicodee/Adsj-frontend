import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StylesProvider } from '@material-ui/core/styles';

ReactDOM.render(
  <React.StrictMode>
     <StylesProvider injectFirst>
    <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
