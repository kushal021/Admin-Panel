import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../Firebase";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from '@mui/icons-material/Visibility';


const Home = () => {
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [text, setText] = useState([]);

  var imageList = [];
  var videoList = [];
  var textList = [];


  const paperStyle = {

    width: 320,

  };


  // Image Query

  useEffect(() => {
    const ref = collection(db, "image");
    const q = query(ref, orderBy("like", "desc"));
    const allDoc = async () => {
      const result = await getDocs(q);
      for (let index = 0; index < 3; index++) {
        imageList.push(result.docs[index].data());
      }
      setImage(imageList);
    };
    allDoc();
  }, []);

  // Video Query

  useEffect(() => {
    const ref = collection(db, "video");
    const q = query(ref, orderBy("like", "desc"));
    const allDoc = async () => {
      const result = await getDocs(q);
      for (let index = 0; index < 3; index++) {
        videoList.push(result.docs[index].data());
      }
      setVideo(videoList);
    };
    allDoc();
  }, []);

  // Text Query

  useEffect(() => {
    const ref = collection(db, "text");
    const q = query(ref, orderBy("like", "desc"));
    const allDoc = async () => {
      const result = await getDocs(q);
      for (let index = 0; index < 3; index++) {
        textList.push(result.docs[index].data());
      }
      setText(textList);
    };
    allDoc();
  }, []);

  return (
    <>
    <style>
      {`
      body{background: #BE93C5;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #7BC6CC, #BE93C5);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #7BC6CC, #BE93C5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }
      `}
    </style>
      {/* Show Image */}

      <Box style={{ margin: "90px 0 0 25px" }}>
        <Typography variant="h4"> Most Liked Images</Typography>
      </Box>
      <Box style={{ marginTop: "-40px" }}>
        <Grid container spacing={2} className="grid">
          <style>
            {`
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

          {image.map((list, index) => {
            return (
              <Grid item xs={12} md={8} key={index}>
                <Card sx={{ maxWidth: 345, width: '330px' }}>
                  <Link to={`${list.id}`} style={{ textDecoration: "none" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={list.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {list.name}
                      </Typography>
                      <Box style={{ display: 'inline-block' }}>
                      <Button>
                        <ThumbUpIcon /> {list.like}
                      </Button>
                    </Box>
                    <Box style={{ display: 'inline-block', margin: 'auto 5px' }}>
                      <Button >
                        <VisibilityIcon /> {12}
                      </Button>
                    </Box>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Show Video */}

      <Box style={{ margin: "90px 0 0 25px" }}>
        <Typography variant="h4"> Most Liked Videos</Typography>
      </Box>
      <Box style={{ marginTop: "-40px" }}>
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
  }
}
      }
      `}
          </style>

          {video.map((list, index) => {
            return (
              <Grid item xs={12} md={8} key={index}>
              <Box key={index}>
              <Paper elevation={10} style={paperStyle}>
                <video width="320" height="240" controls>
                  <source src={list.video} type="video/mp4" />
                </video>
                <Typography variant="h6">{list.name}</Typography>
                <Box style={{ display: 'inline-block' }}>
                  <Button>
                    <ThumbUpIcon /> {list.like}
                  </Button>
                </Box>
                <Box style={{ display: 'inline-block', margin: 'auto 5px' }}>
                  <Button >
                    <VisibilityIcon /> {12}
                  </Button>
                </Box>
              </Paper>
            </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Show Text */}

      <Box style={{ margin: "90px 0 0 25px" }}>
        <Typography variant="h4"> Most Liked Texts</Typography>
      </Box>
      <Box style={{ marginTop: "-40px" }}>
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
  }
}
      }
      `}
          </style>

          {text.map((list, index) => {
            return (
              <Grid item xs={12} md={8} key={index}>
              <Paper elevation={10} style={paperStyle}>
                <Card sx={{ maxWidth: 345 }}>
                  <Typography variant="h6">{list.text}</Typography>
                  <Typography variant="h6">{list.title}</Typography>
                  <Box style={{ display: 'inline-block' }}>
                                    <Button>
                                        <ThumbUpIcon /> {list.like}
                                    </Button>
                                </Box>
                                <Box style={{ display: 'inline-block', margin: 'auto 5px' }}>
                                    <Button >
                                        <VisibilityIcon /> {12}
                                    </Button>
                                </Box>
                </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
