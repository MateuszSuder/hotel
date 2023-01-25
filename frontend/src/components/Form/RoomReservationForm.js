import React, { Fragment, useState } from "react";
import {getIn, useFormik} from "formik";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import {userReservationRoomSchema} from "../Profile/Validation/validationSchemas";
import {useMutation} from "react-query";
import axios from "axios";
import useSnackbar from "../../context/SnackbarProvider";
import useAuth from "../../context/AuthProvider";
import {useNavigate, useParams} from "react-router-dom";

const RoomForm = () => {
    const { roomId } = useParams();
    const { addSnackbar } = useSnackbar();
    const { user } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation(
        (variables) =>
            axios.post(`/api/reservation`, {
                ...variables,
            }),
        {
            onError: (error) => {
                const message = error.response.data.errors[0];

                addSnackbar(message, "error");
            },
            onSuccess: () => {
                addSnackbar("Rezerwacja utworzona pomyślnie!", "success");
                navigate("/profile/reservations");
                formik.resetForm();
            },
        }
    );

    const onSubmit = () => {
        mutation.mutate({
            reservation: {
                roomId,
                startAt: formik.values.fromDate,
                endAt: formik.values.toDate
            },
            paymentData: {
                cardNumber: formik.values.cardNumber,
                cvv: formik.values.CVV,
                validTill: formik.values.validTill
            }
        });
    };

    const formik = useFormik({
        initialValues: {
            fromDate: null,
            toDate: null,
            nameOnCard: "",
            cardNumber: "",
            validTill: "",
            CVV: "",
        },
        validationSchema: userReservationRoomSchema,
        onSubmit,
    });
    const [value, setValue] = useState([null, null]);

    if(!user) {
        return <></>
    }

    const minDate = dayjs().add(1, "day").toDate();

    function getWeeksAfter(date, amount) {
        return date ? date.add(amount, "week") : null;
    }
    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (name === "validTill") {
            const validTillValue = value
                .slice(0, 5)
                .replace(/[^\d]/g, "")
                .replace(/(\d{2})(?=\d{1})/g, "$1/");

            formik.setFieldValue("validTill", validTillValue);
        }
        if (name === "CVV") {
            const cvvValue = value.slice(0, 3).replace(/[^\d]/g, "");
            formik.setFieldValue("CVV", cvvValue);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid
                container
                spacing={3}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={2}>
                    <Typography variant="h3">Zarezerwuj pokój</Typography>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            disablePast
                            startText="Od"
                            endText="Do"
                            inputFormat="DD/MM/YYYY"
                            value={value}
                            minDate={minDate}
                            maxDate={getWeeksAfter(value[0], 4)}
                            onBlur={formik.handleBlur}
                            onChange={(newValue) => {
                                setValue(newValue);
                                formik.setValues({
                                    fromDate: newValue[0]?.format("YYYY-MM-DD"),
                                    toDate: newValue[1]?.format("YYYY-MM-DD"),
                                });
                            }}
                            renderInput={(startformik, endformik) => (
                                <Fragment>
                                    <Grid
                                        container
                                        justifyContent="center"
                                        spacing={3}
                                        mb={3}
                                    >
                                        <Grid item>
                                            <TextField
                                                {...startformik}
                                                error={
                                                    formik.touched.fromDate &&
                                                    Boolean(
                                                        formik.errors.fromDate
                                                    )
                                                }
                                                helperText={
                                                    formik.touched.fromDate &&
                                                    formik.errors.fromDate
                                                }
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                {...endformik}
                                                error={
                                                    formik.touched.toDate &&
                                                    Boolean(
                                                        formik.errors.toDate
                                                    )
                                                }
                                                helperText={
                                                    formik.touched.toDate &&
                                                    formik.errors.toDate
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid
                item
                container
                xs={12}
                alignItems="center"
                flexDirection="column"
                gap={2}
            >
                <Grid item container xs={4}>
                    <TextField
                        fullWidth
                        name="nameOnCard"
                        label="Imię i nazwisko posiadacza"
                        value={formik.values.nameOnCard}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.nameOnCard &&
                            Boolean(formik.errors.nameOnCard)
                        }
                        helperText={
                            formik.touched.nameOnCard &&
                            formik.errors.nameOnCard
                        }
                    />
                </Grid>
                <Grid item container xs={4}>
                    <TextField
                        fullWidth
                        name="cardNumber"
                        label="Numer karty"
                        value={formik.values.cardNumber}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.cardNumber &&
                            Boolean(formik.errors.cardNumber)
                        }
                        helperText={
                            formik.touched.cardNumber &&
                            formik.errors.cardNumber
                        }
                    />
                </Grid>
                <Grid item container xs={4} justifyContent="space-between">
                    <Grid item xs={5}>
                        <TextField
                            name="validTill"
                            label="Data ważności"
                            value={formik.values.validTill}
                            onBlur={formik.handleBlur}
                            onChange={handleChange}
                            error={
                                formik.touched.validTill &&
                                Boolean(formik.errors.validTill)
                            }
                            helperText={
                                formik.touched.validTill &&
                                formik.errors.validTill
                            }
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            type={"password"}
                            name="CVV"
                            label="CVV"
                            value={formik.values.CVV}
                            onBlur={formik.handleBlur}
                            onChange={handleChange}
                            error={
                                formik.touched.CVV && Boolean(formik.errors.CVV)
                            }
                            helperText={formik.touched.CVV && formik.errors.CVV}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} justifyContent="center" my={2}>
                    <Button variant="contained" type="submit" size="large">
                        Zarezerwuj
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default RoomForm;
