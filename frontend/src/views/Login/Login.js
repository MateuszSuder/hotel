import React from 'react';
import {Grid, Paper} from "@mui/material";
import LoginForm from "./LoginForm";

const Login = () => {
    return (
        <Grid justifyContent="center" alignItems="center" sx={{ position: "absolute", height: "100vh" }} container maxWidth="xl">
            <Grid item width="50%">
                <Paper elevation={3}>
                    <LoginForm />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;