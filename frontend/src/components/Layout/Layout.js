import React from "react";
import {AppBar, Box, Container, Grid, IconButton, Toolbar, Tooltip, Typography,} from "@mui/material";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import theme from "../theme/theme";
import {Link, Outlet, useNavigate} from "react-router-dom";
import useSnackbar from "../../context/SnackbarProvider";
import useAuth from "../../context/AuthProvider";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import ColorAvatar from "../ColorAvatar";
import LogoutIcon from '@mui/icons-material/Logout';

const Layout = ({container = true}) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {addSnackbar} = useSnackbar();
    const {user} = useAuth();
    const logout = useMutation(() => axios.post("/api/auth/logout"), {
        onSuccess: async () => {
            addSnackbar("Pomyślnie wylogowano", "success");
            await queryClient.invalidateQueries("user");
            navigate("/");
        }
    })
    return (
        <>
            <AppBar
                position="fixed"
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
            >
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
                                        display: {xs: "none", md: "flex"},
                                        color: "inherit",
                                        textDecoration: "none",
                                        alignItems: "center",
                                        gap: theme.spacing(1),
                                    }}
                                    className="prevent-select"
                                >
                                    <RoomServiceIcon fontSize="32"/>
                                    Hotel
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{marginLeft: "auto"}}>
                            {
                                user ?
                                    (
                                        <Grid container alignItems="center" gap={3}>
                                            <Link to={user.role === "USER" ? "/profile" : "/admin"}>
                                                <Tooltip
                                                    title={user.role === "USER" ? "Profil użytkownika" : "Panel administratora"}>
                                                    <IconButton sx={{p: 0}}>
                                                        <ColorAvatar text={`${user.name} ${user.lastName}`}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <Tooltip title="Wyloguj się" sx={{cursor: "pointer"}}>
                                                <LogoutIcon fontSize="large" onClick={() => logout.mutate()}/>
                                            </Tooltip>
                                        </Grid>
                                    ) :
                                    (
                                        <Link to="/login">
                                            <Typography>
                                                Zaloguj się
                                            </Typography>
                                        </Link>
                                    )
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar/>
            <Grid mt={1} container>
                {container ? (
                    <Container maxWidth="xl">
                        <Outlet/>
                    </Container>
                ) : (
                    <Grid width="100%">
                        <Outlet/>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default Layout;
