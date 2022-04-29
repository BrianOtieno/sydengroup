import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; 
import { UserProvider } from './contexts/UserContext';
import "./i18n";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter> 
    <UserProvider>
      <App /> 
    </UserProvider>
  </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();