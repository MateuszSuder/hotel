import React from 'react';
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import theme from "../../components/theme/theme";

const LoginForm = () => {
    return (
        <Grid
            py={theme.spacing(4)}
            px={theme.spacing(2)}
            container
            flexDirection="column"
            gap={theme.spacing(1)}
        >
            <Grid item py={theme.spacing(2)} xs={12}>
                <Typography variant="h5" align="center">
                    Zaloguj się
                </Typography>
                <Divider/>
            </Grid>
            <TextField id="user-email" label="Email" placeholder="jan.nowak@gmail.com" variant="standard"/>
            <TextField id="standard-basic" type="password" label="Hasło" placeholder="********" variant="standard"/>
            <Grid xs={6} px="auto">
                <Button variant="contained" fullWidth={true}>
                    Zaloguj
                </Button>
                <Typography variant="caption" color={theme.palette.grey["400"]}>
                    <Link to="/register">
                        Nie masz konta? Zarejestruj się
                    </Link>
                </Typography>
            </Grid>

        </Grid>
    );
};

export default LoginForm;