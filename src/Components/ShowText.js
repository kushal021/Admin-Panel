import {
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../Firebase";
import Button from '@mui/material/Button'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from '@mui/icons-material/Visibility';

function ShowImage({ list }) {

    const paperStyle = {
        width: '94%',
        marginLeft: '50px',
        marginBottom: '10px',
        padding:'5px'
    };

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
            <Grid container spacing={2} className="grid" style={{ marginTop: '75px' }}>
                <style>
                    {`
                    body{background: #BE93C5;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #7BC6CC, #BE93C5);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #7BC6CC, #BE93C5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }
      `}
                </style>
                {list.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Paper elevation={10} style={paperStyle}>
                                <Typography variant="h5" style={{ color: 'violet' }}>{item.title}</Typography>
                                <Typography variant="h6">{item.text}</Typography>
                                <Box>
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
