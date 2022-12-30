import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import {Bookmarks, People, Bed, BugReport} from "@mui/icons-material";

const subPages = [
    { name: "Użytkownicy", icon: <People />},
    { name: "Pokoje", icon: <Bed />},
    { name: "Rezerwacje", icon: <Bookmarks />},
    { name: "Problemy", icon: <BugReport />},
]

const AdminPanel = () => {
    const drawerWidth = 240;
    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {subPages.map((page) => (
                            <ListItem key={page.name} disablePadding>
                                <ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            { page.icon }
                                        </ListItemIcon>
                                    </ListItemButton>
                                    <ListItemText primary={page.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default AdminPanel;