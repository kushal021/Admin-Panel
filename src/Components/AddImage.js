import React from "react";
import { useState } from "react";
import {
  Avatar,
  Button,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const Input = styled("input")({
  display: "none",
});

function AddImage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");

  const paperStyle = {
    width: 380,
    margin: "90px auto",
    height: "44vh",
    padding: "8px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reference = collection(db, "image");
    var storageRef = ref(storage, `images/${file.name}`);
    var uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          addDoc(reference, { name: title, image: url });
        });
      }
    );

    setTitle("");
    setFile(0);
  };

  return (
    <>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={{ backgroundColor: "#0984e3", marginBottom: "5px" }}>
                <AddPhotoAlternateIcon />
              </Avatar>
              <Typography variant="h4" gutterBottom>
                Add Image
              </Typography>
            </Grid>
            <TextField
              label="Title"
              placeholder="Add Your Image Title"
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
                <div style={{ cursor: 'pointer', width: '150px' }}>
                  Upload Image
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
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

export default AddImage;
