import React, {useState} from 'react';
import {
    Box, Container, Divider,
    Drawer, Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar, Typography,
} from "@mui/material";
import {Bookmarks, People, Bed, BugReport} from "@mui/icons-material";
import AdminUsers from "../../components/AdminPanel/AdminUsers";
import AdminRooms from "../../components/AdminPanel/AdminRooms";
import AdminReservations from "../../components/AdminPanel/AdminReservations";
import AdminIssues from "../../components/AdminPanel/AdminIssues";

const subPages = [
    {name: "Użytkownicy", icon: <People/>, component: AdminUsers},
    {name: "Pokoje", icon: <Bed/>, component: AdminRooms},
    {name: "Rezerwacje", icon: <Bookmarks/>, component: AdminReservations},
    {name: "Problemy", icon: <BugReport/>, component: AdminIssues},
]

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

const AdminPanel = () => {
    const [page, setPage] = useState(subPages[0]);

    const Component = page.component;

    const drawerWidth = 240;
    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
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
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Typography variant="h4">
                    { page.name }
                </Typography>
                <Divider />
                <Component />
            </Box>
        </Box>
    );
};

export default AdminPanel;