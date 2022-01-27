import React, { useState } from 'react';
import { SideBarData } from './SideBarData'
//import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
const drawerWidth = 240;

function SideBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [imageOpen, setImageOpen] = useState(false)
    const [videoOpen, setVideoOpen] = useState(false)
    const [textOpen, setTextOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleImageOpen = () => {
        setImageOpen(!imageOpen)
        setTextOpen(false)
        setVideoOpen(false)
    }
    const handleVideoOpen = () => {
        setVideoOpen(!videoOpen)
        setImageOpen(false)
        setTextOpen(false)
    }
    const handleTextOpen = () => {
        setTextOpen(!textOpen)
        setImageOpen(false)
        setVideoOpen(false)
    }


    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {SideBarData.map((text, index) => {
                    if (text.parentTitle === "") {
                        return (
                            <ListItem button key={index}>
                                <ListItemText key={text.key} primary={text.child.childTitle} />
                            </ListItem>
                        )
                    }
                    else if (text.parentTitle === "Image") {
                        return (
                            <div key={index}>
                                <ListItemButton onClick={handleImageOpen}>
                                    <ListItemText primary={text.parentTitle} />
                                    {imageOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={imageOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {text.child.map((item, indexChild) => (
                                            <ListItemButton key={indexChild} sx={{ pl: 4 }}>
                                                <ListItemText primary={item.childTitle} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        )
                    }
                    else if (text.parentTitle === "Video") {
                        return (
                            <div key={index}>
                                <ListItemButton onClick={handleVideoOpen}>
                                    <ListItemText primary={text.parentTitle} />
                                    {videoOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={videoOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {text.child.map((item, indexChild) => (
                                            <ListItemButton key={indexChild} sx={{ pl: 4 }}>
                                                <ListItemText primary={item.childTitle} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        )
                    }
                    else if (text.parentTitle === "Text") {
                        return (
                            <div key={index}>
                                <ListItemButton onClick={handleTextOpen}>
                                    <ListItemText primary={text.parentTitle} />
                                    {textOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={textOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {text.child.map((item, indexChild) => (
                                            <ListItemButton key={indexChild} sx={{ pl: 4 }}>
                                                <ListItemText primary={item.childTitle} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        )
                    }
                })}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: 'black'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }} component="div">
                            Admin Panel
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                </Box>
            </Box>
        </>
    );
}

export default SideBar;