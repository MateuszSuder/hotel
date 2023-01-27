import React, { useState } from "react";
import { useFormik, getIn } from "formik";
import {
    TextField,
    Grid,
    InputAdornment,
    Button,
    Typography,
    Divider,
    IconButton,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { registerValidationSchema } from "./../../components/Profile/Validation/validationSchemas";
import theme from "./../../components/theme/theme";
import axios from "axios";
import useSnackbar from "../../context/SnackbarProvider";
import { useMutation } from "react-query";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { addSnackbar } = useSnackbar();
    const mutation = useMutation(
        () =>
            axios.post("/api/auth/register", {
                ...formik.values,
            }),
        {
            onError: (error) => {
                const message = error.response.data.errors[0];
                addSnackbar(message, "error");
            },
            onSuccess: () => {
                addSnackbar(
                    "Zarejestrowano. Potwierdź swoje konto linkiem, którego otrzymałeś w mailu",
                    "success"
                );
                navigate("/login");
            },
        }
    );
    const onSubmit = () => {
        mutation.mutate();
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            lastName: "",
            dateOfBirth: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            address: {
                city: "",
                street: "",
                postal: "",
                houseNumber: "",
                apartmentNumber: "",
            },
        },
        validationSchema: registerValidationSchema,
        onSubmit,
    });

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (name === "phoneNumber") {
            const phoneNuberValue = value
                .slice(0, 11)
                .replace(/[^\d]/g, "")
                .replace(/(\d{3})(?=\d{1})/g, "$1 ");

            formik.setFieldValue("phoneNumber", phoneNuberValue);
        }
        if (name === "address.postal") {
            const postalValue = value
                .slice(0, 6)
                .replace(/[^\d]/g, "")
                .replace(/(\d{2})(\d{3})/, "$1-$2");

            formik.setFieldValue("address.postal", postalValue);
        }
    };
    const [show, setShow] = useState({
        password: false,

        confirmPassword: false,
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Grid container spacing={2}>
                    <Grid container item justifyContent="center">
                        <Typography variant="h4">Zarejestruj się</Typography>
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
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="name"
                            id="name"
                            label="Imię"
                            value={formik.values.name}
                            error={
                                formik.touched.name &&
                                Boolean(!!formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="lastName"
                            id="lastName"
                            label="Nazwisko"
                            value={formik.values.lastName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.lastName &&
                                Boolean(formik.errors.lastName)
                            }
                            helperText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="phoneNumber"
                            id="phoneNumber"
                            label="Numer telefonu"
                            value={formik.values.phoneNumber}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.phoneNumber &&
                                Boolean(formik.errors.phoneNumber)
                            }
                            helperText={
                                formik.touched.phoneNumber &&
                                formik.errors.phoneNumber
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        +48
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DesktopDatePicker
                            disableFuture
                            label="Data urodzenia"
                            inputFormat="DD/MM/YYYY"
                            name="dateOfBirth"
                            minDate={moment().subtract(100, "years")}
                            maxDate={moment().subtract(18, "years")}
                            value={formik.values.dateOfBirth}
                            onBlur={formik.handleBlur}
                            onChange={(date) =>
                                formik.setFieldValue("dateOfBirth", date)
                            }
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    {...params}
                                    error={
                                        formik.touched.dateOfBirth &&
                                        Boolean(formik.errors.dateOfBirth)
                                    }
                                    helperText={
                                        formik.touched.dateOfBirth &&
                                        formik.errors.dateOfBirth
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="password"
                            label="Hasło"
                            type={show.password ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.password &&
                                Boolean(!!formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShow({
                                                    ...show,
                                                    password: !show.password,
                                                })
                                            }
                                            edge="end"
                                        >
                                            {show ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="confirmPassword"
                            label="Powtórz hasło"
                            type={show.confirmPassword ? "text" : "password"}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(!!formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShow({
                                                    ...show,
                                                    confirmPassword:
                                                        !show.confirmPassword,
                                                })
                                            }
                                            edge="end"
                                        >
                                            {show ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="caption"
                            color={theme.palette.grey["400"]}
                        >
                            Adres
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="address.postal"
                            label="Kod pocztowy"
                            value={formik.values.address.postal}
                            onBlur={formik.handleBlur}
                            onChange={handleChange}
                            error={
                                getIn(formik.touched, "address.postal") &&
                                Boolean(getIn(formik.errors, "address.postal"))
                            }
                            helperText={
                                getIn(formik.touched, "address.postal") &&
                                getIn(formik.errors, "address.postal")
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="address.city"
                            label="Miasto"
                            value={formik.values.address.city}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                getIn(formik.touched, "address.city") &&
                                Boolean(getIn(formik.errors, "address.city"))
                            }
                            helperText={
                                getIn(formik.touched, "address.city") &&
                                getIn(formik.errors, "address.city")
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="address.street"
                            label="Ulica"
                            value={formik.values.address.street}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                getIn(formik.touched, "address.street") &&
                                Boolean(getIn(formik.errors, "address.street"))
                            }
                            helperText={
                                getIn(formik.touched, "address.street") &&
                                getIn(formik.errors, "address.street")
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="address.houseNumber"
                            label="Numer budynku"
                            value={formik.values.address.houseNumber}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                getIn(formik.touched, "address.houseNumber") &&
                                Boolean(
                                    getIn(formik.errors, "address.houseNumber")
                                )
                            }
                            helperText={
                                getIn(formik.touched, "address.houseNumber") &&
                                getIn(formik.errors, "address.houseNumber")
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="address.apartmentNumber"
                            label="Numer mieszkania"
                            value={formik.values.address.apartmentNumber}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                getIn(
                                    formik.touched,
                                    "address.apartmentNumber"
                                ) &&
                                Boolean(
                                    getIn(
                                        formik.errors,
                                        "address.apartmentNumber"
                                    )
                                )
                            }
                            helperText={
                                getIn(
                                    formik.touched,
                                    "address.apartmentNumber"
                                ) &&
                                getIn(formik.errors, "address.apartmentNumber")
                            }
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    mt={1}
                    spacing={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        item
                        xs={12}
                        style={{ minWidth: "50%", width: "100%" }}
                    >
                        <Button
                            style={{ minWidth: "50%", width: "100%" }}
                            variant="contained"
                            type="submit"
                            size="large"
                        >
                            Zarejestruj
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            variant="caption"
                            color={theme.palette.grey["400"]}
                        >
                            <Link to="/login">Masz już konto? Zaloguj się</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};
export default RegisterForm;
