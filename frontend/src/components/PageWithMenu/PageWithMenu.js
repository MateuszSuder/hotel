import React, {useState} from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";

const AdminPanelListItems = ({page, changePage}) => {
    return (
        <ListItem key={page.name} disablePadding>
            <ListItemButton onClick={() => changePage(page)}>
                <ListItemButton>
                    <ListItemIcon>
                        {page.icon}
                    </ListItemIcon>
                </ListItemButton>
                <ListItemText primary={page.name}/>
            </ListItemButton>
        </ListItem>
    )
}

const PageWithMenu = ({ children, subPages }) => {
    const [page, setPage] = useState(subPages[0]);

    const Component = page.component;

    const drawerWidth = 240;

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {subPages.map((page, index) => (
                            <AdminPanelListItems page={page} changePage={(page) => setPage(page)} key={page.name + index} />
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ display: "flex", flexDirection: "column", width: "100%" }} p={2}>
                <Typography variant="h4" mb={1}>
                    { page.name }
                </Typography>
                <Divider />
                <Component />
                {children}
            </Box>
        </Box>

    );
};

export default PageWithMenu;