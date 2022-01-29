import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserAuth } from './UserAuthContext'

function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp, user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => {
      if (user) {
        return navigate('/')
      }
    }
    check()
  }, [])

  const paperStyle = {
    width: 380,
    margin: "20px auto",
    height: "58vh",
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password)
      navigate('/login')
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography variant="h4" gutterBottom>
              SIGN UP
            </Typography>
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter your Email"
            type="email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ margin: "10px", width: "350px" }}
          />
          <TextField
            label="Password"
            placeholder="Enter your Password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ margin: "10px", width: "350px" }}
          />
          <Grid align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ margin: "20px auto" }}
            >
              SIGN UP
            </Button>
            <br />
            <Typography variant="p" gutterBottom> Already have an account?  </Typography>

            <Link to='/login' style={{ textDecoration: 'none' }} >Log In</Link>

          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default SignUp;
