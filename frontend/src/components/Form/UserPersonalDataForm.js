import { useFormik, getIn } from "formik";
import { TextField, Grid, InputAdornment, Button } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { useMutation } from "react-query";
import axios from "axios";
import useSnackbar from "../../context/SnackbarProvider";
import useAuth from "../../context/AuthProvider";
import {editPersonalDataSchema} from "../Profile/Validation/validationSchemas";

const EditPersonalDataForm = () => {
    const { addSnackbar } = useSnackbar();
    const {
        user: { _id, email, name, lastName, dateOfBirth, address, phoneNumber },
        refetch,
    } = useAuth();

    const mutation = useMutation(
        () =>
            axios.put(`/api/user/${_id}`, {
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
            },
        }
    );

    const onSubmit = () => {
        mutation.mutate();
    };

    const formik = useFormik({
        initialValues: {
            name,
            lastName,
            dateOfBirth,
            address,
            phoneNumber,
        },
        validationSchema: editPersonalDataSchema,
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

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="email"
                        id="email"
                        label="Email"
                        value={email}
                        disabled={true}
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
                            formik.touched.name && Boolean(!!formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
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
                            formik.touched.lastName && formik.errors.lastName
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
                            Boolean(getIn(formik.errors, "address.houseNumber"))
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
                            getIn(formik.touched, "address.apartmentNumber") &&
                            Boolean(
                                getIn(formik.errors, "address.apartmentNumber")
                            )
                        }
                        helperText={
                            getIn(formik.touched, "address.apartmentNumber") &&
                            getIn(formik.errors, "address.apartmentNumber")
                        }
                    />
                </Grid>
            </Grid>
            <Grid container mt={1} spacing={3} justifyContent="flex-end">
                <Grid item>
                    <Button variant="contained" type="submit">
                        zapisz
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
export default EditPersonalDataForm;
