import React from 'react';
import { useState } from "react";
import {
  Avatar,
  Button,
  InputLabel,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { addDoc, collection} from "firebase/firestore";
import { db } from "../Firebase";

function AddVideo() {

    const paperStyle = {
        width: 380,
        margin: "20px auto",
        height: "44vh",
        padding: "8px",
      };


      const [title, setTitle] = useState("");
      const [file, setFile] = useState("");




      const uploadVideo = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFile(base64);
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        const ref = collection(db, "video");
        await addDoc(ref, {
          title: title,
          video: file,
        });
    
        setTitle("");
        setFile(0);
      };

  return (
      <>
           <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#0984e3" }}>
              <OndemandVideoIcon />
            </Avatar>
            <Typography variant="h4" gutterBottom>
              Add Video
            </Typography>
          </Grid>
          <TextField
            label="Title"
            placeholder="Add Your Video Title"
            type="text"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            style={{ margin: "10px", width: "350px" }}
          />

          <Grid align="center">
            <InputLabel>
              Upload Image
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={uploadVideo}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </InputLabel>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ margin: "20px auto" }}
            >
              Add
            </Button>
          </Grid>
        </Paper>
      </Grid>
      </>
  );
}

export default AddVideo;
