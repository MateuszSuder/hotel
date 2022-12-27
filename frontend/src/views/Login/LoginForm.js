import React, {useState} from 'react';
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import theme from "../../components/theme/theme";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        console.log(email, password);
    }

    return (
        <Grid
            py={4}
            px={2}
            container
            flexDirection="column"
            gap={1}
        >
            <Grid item py={2} xs={12}>
                <Typography variant="h5" align="center" pb={1}>
                    Zaloguj się
                </Typography>
                <Divider/>
            </Grid>
            <TextField id="user-email" label="Email" placeholder="jan.nowak@gmail.com" variant="standard" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField id="user-password" type="password" label="Hasło" placeholder="********" variant="standard" value={password} onChange={e => setPassword(e.target.value)} />
            <Grid container xs={12} alignItems="center" display="flex" flexDirection="column" mt={4}>
                <Grid item xs={8} mb={2}>
                    <Button variant="contained" style={{ width: "25em" }} onClick={submit} >
                        Zaloguj
                    </Button>
                </Grid>
                <Grid item>
                    <Typography variant="caption" color={theme.palette.grey["400"]}>
                        <Link to="/register">
                            Nie masz konta? Zarejestruj się
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LoginForm;