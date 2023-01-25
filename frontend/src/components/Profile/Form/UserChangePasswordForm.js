import React, { useState } from "react";
import { useFormik } from "formik";
import {
    TextField,
    Grid,
    InputAdornment,
    IconButton,
    Button,
} from "@mui/material";
import { userChangePasswordSchame } from "../Validation/validationSchemas";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useMutation} from "react-query";
import axios from "axios";
import useAuth from "../../../context/AuthProvider";
import useSnackbar from "../../../context/SnackbarProvider";

const UserChangePasswordForm = () => {
    const { addSnackbar } = useSnackbar();
    const { user: { _id}, refetch } = useAuth();

    const mutation = useMutation(
        () =>
            axios.put(`/api/user/${_id}/change-password`, {
                ...formik.values,
            }),
        {
            onError: (error) => {
                const message = error.response.data.errors[0];
                addSnackbar(message, "error");
            },
            onSuccess: () => {
                refetch();
                addSnackbar("Dane pomyślnie zmienione", "success");
                formik.resetForm();
            },
        }
    );

    const onSubmit = () => {
        mutation.mutate();
    }

    const formik = useFormik({
        initialValues: {
            actualPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: userChangePasswordSchame,

        onSubmit,
    });

    const [show, setShow] = useState({
        actualPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="actualPassword"
                        label="Aktualne hasło"
                        type={show.actualPassword ? "text" : "password"}
                        value={formik.values.actualPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.actualPassword &&
                            Boolean(!!formik.errors.actualPassword)
                        }
                        helperText={
                            formik.touched.actualPassword &&
                            formik.errors.actualPassword
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            setShow({
                                                ...show,
                                                actualPassword:
                                                    !show.actualPassword,
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
                    <TextField
                        fullWidth
                        name="newPassword"
                        label="Nowe hasło"
                        type={show.newPassword ? "text" : "password"}
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.newPassword &&
                            Boolean(!!formik.errors.newPassword)
                        }
                        helperText={
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            setShow({
                                                ...show,
                                                newPassword: !show.newPassword,
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
                    <TextField
                        fullWidth
                        name="confirmNewPassword"
                        label="Powtórz nowe hasło"
                        type={show.confirmNewPassword ? "text" : "password"}
                        value={formik.values.confirmNewPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.confirmNewPassword &&
                            Boolean(!!formik.errors.confirmNewPassword)
                        }
                        helperText={
                            formik.touched.confirmNewPassword &&
                            formik.errors.confirmNewPassword
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShow({
                                                ...show,
                                                confirmNewPassword:
                                                    !show.confirmNewPassword,
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
            </Grid>
            <Grid container mt={2}>
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                >
                    Zmień hasło
                </Button>
            </Grid>
        </form>
    );
};
export default UserChangePasswordForm;
