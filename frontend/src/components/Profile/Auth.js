import React, {useState} from "react";
import {Grid, Typography, Stack, Skeleton, TextField, Button} from "@mui/material";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import useAuth from "../../context/AuthProvider";
import theme from "../theme/theme";
import {useFormik} from "formik";
import {object, string} from "yup";
import {requiredString} from "./Validation/validationSchemas";
import useSnackbar from "../../context/SnackbarProvider";

const twoFactorSchema = object({
    code: string()
        .required(requiredString)
        .min(6, "Kod jest za krótki")
        .max(6, "Kod jest za długi")
        .matches(/[0-9]{6}/, {
            message: "Kod może składać się tylko z cyfr"
        })
        .trim()
})

const Auth = () => {
    const { addSnackbar } = useSnackbar();
    const { user, refetch } = useAuth();

    const {data, isLoading, error} = useQuery("user-2fa", () => axios.get("/api/auth/2fa"), {
        retry: false,
        refetchOnWindowFocus: false
    });

    const mutation = useMutation(
        () =>
            axios.put(`/api/auth/2fa`, {
                ...formik.values,
            }),
        {
            onError: (error) => {
                addSnackbar("Niepoprawny kod", "error");
            },
            onSuccess: () => {
                refetch();
                addSnackbar("Autoryzacja dwuetapowa włączona!", "success");
            },
        }
    );

    const onSubmit = () => {
        mutation.mutate();
    }

    const formik = useFormik({
        initialValues: {
            code: ""
        },
        validationSchema: twoFactorSchema,
        onSubmit
    })

    if (error) {
        return (
            <Grid maxWidth="xl">
                <Typography align="center" variant="h5" color={theme.palette.error.main}>
                    Wystąpił błąd
                </Typography>
            </Grid>
        )
    }

    if (isLoading) {
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
            </Stack>
        )
    }

    return (
        <Grid container spacing={3} pt={3} flexDirection="column" alignItems="center">
            <Typography variant="h4" pb={1} align="center">
                Dwustopniowa autoryzacja
            </Typography>
            <Typography variant="h5" pb={3} align="center"
                        color={user.twoFactorEnabled ? theme.palette.success.main : theme.palette.error.main}>
                {user.twoFactorEnabled ? "Włączona" : "Wyłączona"}
            </Typography>
            <Typography variant="body1" pb={3} align="center">
                Zeskanuj kod QR, a następnie zatwierdź wpisując kod z aplikacji mobilnej w pole tekstowe
            </Typography>
            {
                !user.twoFactorEnabled && (
                    <>
                    <Grid item>
                        <div dangerouslySetInnerHTML={{__html: data.data}}/>
                    </Grid>
                    <Grid item>
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
                </>
                )
            }
        </Grid>
    );
};

export default Auth;
