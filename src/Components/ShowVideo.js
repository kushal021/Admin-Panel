import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";

function ShowImage() {
  const [list, setList] = useState([]);

  
  const paperStyle = {

    width: 320,

  };

  useEffect(() => {
    const ref = collection(db, "video");
    const show = async () => {
      const data = await getDocs(ref);
      setList(data.docs.map((ls, index) => ({ ...ls.data(), id: ls.id })));
    };
    show();
  }, []);
  return (
    <>
      <Grid container spacing={2} className="grid">
      <style>
          {`
      .grid{
        width: 90vw;
  max-width: 1170px;
  margin: 5rem auto;
  display: grid;
  gap: 2rem;
}
@media screen and (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    /* align-items: start; */
  }
}
      }
      `}
        </style>
        {list.map((item, id) => {
          return (
              <Box key={id}>
             <Paper elevation={10} style={paperStyle}>
            <video width="320" height="240" controls>
              <source src={item.Video} type="video/mp4" />
            </video>
            <Typography variant="h6">{item.name}</Typography>
            </Paper>
            </Box>
          );
        })}
      </Grid>
    </>
  );
}

export default ShowImage;
