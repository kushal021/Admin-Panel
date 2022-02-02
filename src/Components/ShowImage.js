import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../Firebase";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from '@mui/icons-material/Visibility';

function ShowImage({ list }) {

  const increaseLike = async (id, like) => {
    var newLike = like + 1;
    const ref = doc(db, 'image', id)
    try {
      await updateDoc(ref, { like: newLike })
    } catch (error) {

    }
  }

  const deleteItem = async (id) => {
    const ref = doc(db, 'image', id)
    try {
      await deleteDoc(ref)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Grid container spacing={2} className="grid" >
        <style>
          {`
          body{background: #BE93C5;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #7BC6CC, #BE93C5);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #7BC6CC, #BE93C5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }
      .grid{
        width: 1100px;
  max-width: 1170px;
  margin: 5rem auto;
  display: grid;
  gap: 8px;
}
@media screen and (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
      }
      `}
        </style>
        {list?.map((item, id) => {
          return (
            <Grid item xs={12} md={8} key={id}>
              <Card sx={{ maxWidth: 345, width:'350px' }}>
                  <CardMedia
                    component="img"
                    height="190"
                    width="300px"
                    image={item.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Box style={{ display: 'inline-block' }}>
                      <Button onClick={() => increaseLike(item.id, item.like)}>
                        <ThumbUpIcon /> {item.like}
                      </Button>
                    </Box>
                    <Box style={{ display: 'inline-block', margin: 'auto 5px' }}>
                      <Button >
                        <VisibilityIcon /> {12}
                      </Button>
                    </Box>
                    <Button variant='contained' color='error' onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem(item.id) }}>
                      Delete
                    </Button>
                  </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}

export default ShowImage;
