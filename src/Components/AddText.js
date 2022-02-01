import React from "react";
import { useState } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";

function AddText() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const like = 0;

  const paperStyle = {
    width: 380,
    margin: "90px auto",
    height: "59vh",
    padding: "8px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, "text");
    await addDoc(ref, {
      title: title,
      text: text,
      like: like
    });

    setTitle("");
    setText("");
  };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#0984e3", marginBottom: "5px" }}>
              <TextSnippetIcon />
            </Avatar>
            <Typography variant="h4" gutterBottom>
              Add Text
            </Typography>
          </Grid>
          <TextField
            label="Title"
            placeholder="Add Your Text Title"
            type="text"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            style={{ margin: "10px", width: "350px" }}
          />
          <TextField
            label="Text"
            placeholder="Add Your Text Here"
            type="text"
            variant="outlined"
            multiline
            rows={4}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
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
              Add
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default AddText;
