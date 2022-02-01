import {
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import Button from '@mui/material/Button'

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
                {console.log(list)}
                {list.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Paper elevation={10} style={paperStyle}>
                                <Typography variant="h6">{item.text}</Typography>
                                <Typography variant="h6">{item.title}</Typography>
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
