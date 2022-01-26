import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';



ReactDOM.render(
  <Router>
  <UserAuthContextProvider>
  <Routes>
    <Route>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    </Route>
  </Routes>
  </UserAuthContextProvider>
  </Router>,
  document.getElementById('root')
);


