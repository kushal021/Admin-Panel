import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserAuthContextProvider } from './Auth/UserAuthContext';

ReactDOM.render(
  <UserAuthContextProvider><App /></UserAuthContextProvider>,
  document.getElementById('root')
);


