import React, { useState } from "react";
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import EditPersonalDataForm from "./Form/UserPersonalDataForm";
import EditIcon from "@mui/icons-material/Edit";

const UserInfo = () => {
    return (
        <Grid container spacing={4} pt={3} direction="row">
            <Grid item xs={4}>
                <Typography variant="h5" pb={3}>
                    Dane Osobowe
                </Typography>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: "5px",
                        border: "0.5px solid grey",
                    }}
                >
                    <EditPersonalDataForm />
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Grid item>
                    <Typography variant="h5" pb={3}>
                        Zmiana hasła
                    </Typography>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: "5px",
                            border: "0.5px solid grey",
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserInfo;
