import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserAuthContextProvider } from './Auth/UserAuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import ProtectedRoute from './Auth/ProtectedRoute'
import AddImage from './Components/AddImage'
import AddVideo from './Components/AddVideo'
import AddText from './Components/AddText'
import SideBar from './Drawer/SideBar'
import Grid from '@mui/material/Grid'

ReactDOM.render(
  <Router>
    <UserAuthContextProvider>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route>
              <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
              <Route path="/addimage" element={<ProtectedRoute><AddImage /></ProtectedRoute>} />
              <Route path="/addvideo" element={<ProtectedRoute><AddVideo /></ProtectedRoute>} />
              <Route path="/addtext" element={<ProtectedRoute><AddText /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </Grid>
      </Grid>
    </UserAuthContextProvider>
  </Router>,
  document.getElementById('root')
);


