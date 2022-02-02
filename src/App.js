import React, { useState, useEffect } from "react";
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
import Home from './Components/Home'
import { useUserAuth } from './Auth/UserAuthContext'
import PaginationImage from './Pagination/PaginationImage'
import PaginationVideo from './Pagination/PaginationVideo'
import PaginationText from './Pagination/PaginationText'

function App() {

  const { user } = useUserAuth();
  const [isUser, setIsUser] = useState(false)

  useEffect(() => {
    const find = () => {
      if (user) {
        return setIsUser(true)
      }
      else{
        return setIsUser(false)
      }
    }
    find()
  }, [user])


  return (
    <>
    <Router>
      <UserAuthContextProvider>
        <Grid container spacing={6}>
          <Grid item xs={2}>
            {isUser === true ? <SideBar /> : null}
          </Grid>
          <Grid item xs={10}>
            <Routes>
              <Route>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/addimage" element={<ProtectedRoute><AddImage /></ProtectedRoute>} />
                <Route path="/addvideo" element={<ProtectedRoute><AddVideo /></ProtectedRoute>} />
                <Route path="/addtext" element={<ProtectedRoute><AddText /></ProtectedRoute>} />
                <Route path="/showimages" element={<ProtectedRoute><PaginationImage /></ProtectedRoute>} />
                <Route path="/showvideos" element={<ProtectedRoute><PaginationVideo /></ProtectedRoute>} />
                <Route path="/showtexts" element={<ProtectedRoute><PaginationText /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
            </Routes>
          </Grid>
        </Grid>
      </UserAuthContextProvider>
    </Router>
    </>
  )
}

export default App;
