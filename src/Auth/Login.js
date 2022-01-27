import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserAuth} from './UserAuthContext'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {logIn, user} = useUserAuth();
  const nav = useNavigate();

  const paperStyle = {
    width: 380,
    margin: "20px auto",
    height: "58vh",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        await logIn(email, password);
        nav("/");
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography variant="h4" gutterBottom>
              LOG IN
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
              LOG IN
            </Button>
            <br/>
            <Typography variant="p" gutterBottom> New User?  </Typography>
            
            <Link to='/signup' style={{textDecoration: 'none'}} >Create an account</Link>
            
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
