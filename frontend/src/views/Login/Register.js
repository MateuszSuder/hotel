import React from "react";
import { Grid, Paper } from "@mui/material";
import RegisterForm from "./RegisterForm";

const Register = () => {
    return (
        <Grid
            justifyContent="center"
            alignItems="center"
            sx={{ position: "absolute", width: "100vw", height: "100vh" }}
            container
        >
            <Grid item width="40%">
                <Paper elevation={8}>
                    <Grid container>
                        <Grid item xs={12} p={3}>
                            <RegisterForm />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
