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
import ShowImages from './Components/ShowImage'
import ShowVideos from './Components/ShowVideo'
import ShowTexts from './Components/ShowText'

ReactDOM.render(
  <UserAuthContextProvider><App /></UserAuthContextProvider>,
  document.getElementById('root')
);


