import React, {useState} from "react";
import {
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import theme from "../../components/theme/theme";
import axios from "axios";
import {useMutation} from "react-query";
import useAuth from "../../context/AuthProvider";
import useSnackbar from "../../context/SnackbarProvider";
import {useFormik} from "formik";
import {loginValidationSchema} from "../../components/Profile/Validation/validationSchemas";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CustomModal from "../../components/CustomModal";
import {twoFactorSchema} from "../../components/Profile/Auth";

const TwoAuthConfirmation = ({onSubmit, open, setOpen}) => {
    const formik = useFormik({
        initialValues: {
            code: ""
        },
        validationSchema: twoFactorSchema,
        onSubmit
    })

    return (
        <CustomModal open={open} setOpen={setOpen}>
            <Grid container alignItems="center">
                <Grid item xs={12} mb={3}>
                    <Typography variant="h6" align="center">
                        Podaj kod ze swojej aplikacji autoryzacyjnej
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <Grid container alignItems="center" flexDirection="column" gap={2}>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    name="code"
                                    id="code"
                                    label="Kod"
                                    value={formik.values.code}
                                    error={
                                        formik.touched.code && Boolean(!!formik.errors.code)
                                    }
                                    helperText={formik.touched.code && formik.errors.code}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    type="submit"
                                >
                                    wyślij
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

const LoginForm = () => {
    const [twoFactor, setTwoFactor] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useAuth();
    const {addSnackbar} = useSnackbar();

    const mutation = useMutation(
        (values) =>
            axios.post("/api/auth/login", {
                ...values,
            }),
        {
            onError: (error) => {
                if(error.response?.data?.codeNeeded) {
                    setTwoFactor(true);
                } else {
                    const message = error.response.data.errors[0];
                    addSnackbar(message, "error");
                }
            },
            onSuccess: (data) => {
                setUser(data.data);
                addSnackbar("Zalogowano", "success");
                setTwoFactor(false);
                navigate("/");
            },
        }
    );

    const onSubmit = () => {
        mutation.mutate(formik.values);
    };

    const submitWithCode = (code) => {
        mutation.mutate({
            ...formik.values,
            code: code.code
        })
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit,
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Grid py={4} px={3} container flexDirection="column" gap={1}>
                    <Grid item py={2} xs={12}>
                        <Typography variant="h4" align="center" pb={1}>
                            Zaloguj się
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="email"
                            id="email"
                            label="Email"
                            value={formik.values.email}
                            error={
                                formik.touched.email &&
                                Boolean(!!formik.errors.email)
                            }
                            helperText={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="password"
                            label="Hasło"
                            type={show ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.password &&
                                Boolean(!!formik.errors.password)
                            }
                            helperText={
                                formik.touched.password && formik.errors.password
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShow((prev) => !prev)}
                                            edge="end"
                                        >
                                            {show ? (
                                                <VisibilityOff/>
                                            ) : (
                                                <Visibility/>
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid container item xs={12} mt={2} mb={2}>
                            <Button
                                style={{minWidth: "50%", width: "100%"}}
                                variant="contained"
                                type="submit"
                                size="large"
                            >
                                Zaloguj
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="caption"
                                color={theme.palette.grey["400"]}
                            >
                                <Link to="/register">
                                    Nie masz konta? Zarejestruj się
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <TwoAuthConfirmation open={twoFactor} setOpen={() => null} onSubmit={(code) => submitWithCode(code)} />
        </>
    );
};

export default LoginForm;
