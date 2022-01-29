import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserAuthContextProvider } from './Auth/UserAuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import ProtectedRoute from './Auth/ProtectedRoute'



ReactDOM.render(
  <Router>
    <UserAuthContextProvider>
      <Routes>
        <Route>
          <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </UserAuthContextProvider>
  </Router>,
  document.getElementById('root')
);


