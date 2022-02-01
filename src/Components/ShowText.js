import {
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import Button from '@mui/material/Button'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from '@mui/icons-material/Visibility';

function ShowImage() {
    const [list, setList] = useState([]);


    const paperStyle = {

        width: 320,

    };

    useEffect(() => {
        const ref = collection(db, "text");
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
        const ref = doc(db, 'text', id)
        try {
            await deleteDoc(ref)
        } catch (error) {
            alert(error)
        }
    }


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
              }
            }
            }
      `}
                </style>
                {list.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Paper elevation={10} style={paperStyle}>
                                <Typography variant="h6">{item.text}</Typography>
                                <Typography variant="h6">{item.title}</Typography>
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
                            </Paper>
                        </Box>
                    );
                })}
            </Grid>
        </>
    );
}

export default ShowImage;
