import { Card, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from '@mui/icons-material/Visibility';

function ShowImage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const ref = collection(db, "image");
    const show = async () => {
      const data = await getDocs(ref);
      setList(data.docs.map((ls, index) => ({ ...ls.data(), id: ls.id })));
    };
    show();
  }, []);

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
  }
}
      }
      `}
        </style>
        {list.map((item, id) => {
          return (
            <Grid item xs={12} md={8} key={id}>
              <Card sx={{ maxWidth: 345 }}>
                <Link to={`${id}`} style={{ textDecoration: "none" }}>
                  <CardMedia
                    component="img"
                    height="140"
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
                </Link>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}

export default ShowImage;
