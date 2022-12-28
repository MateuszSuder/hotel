import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Menu,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import RoomServiceIcon from '@mui/icons-material/RoomService';
import theme from "../theme/theme";
import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box>
                            <Link to="/">
                                <Typography
                                    variant="h4"
                                    textTransform="uppercase"
                                    letterSpacing={theme.spacing(0.3)}
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        alignItems: 'center',
                                        gap: theme.spacing(1)
                                    }}
                                >
                                    <RoomServiceIcon fontSize="32" />
                                    Hotel
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{marginLeft: "auto"}}>
                            <Link to="/profile">
                                <Tooltip title="Profil użytkownika">
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar>
                                            M
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid mt={1} container>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Grid>
        </>
    );
};

export default Layout;