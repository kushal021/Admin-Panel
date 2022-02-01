import { Card, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";

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
    /* align-items: start; */
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
