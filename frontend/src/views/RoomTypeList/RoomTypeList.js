import React, { useState } from "react";
import {
    TextField,
    Grid,
    Typography,
    Stack,
    Skeleton,
    Button,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useFormik } from "formik";
import theme from "./../../components/theme/theme";
import { useMutation } from "react-query";
import useSnackbar from "../../context/SnackbarProvider";
import { roomTypeEditSchema } from "../../components/Profile/Validation/validationSchemas";
function RoomTypeRow({ roomType }) {
    const [expanded, setExpanded] = useState(false);
    const { addSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const mutation = useMutation(
        () =>
            axios.put(`/api/room/type/${roomType._id}`, {
                ...formik.values,
            }),
        {
            onError: (error) => {
                const message = error.response.data.errors[0];
                addSnackbar(message, "error");
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["roomTypes"],
                });

                addSnackbar("Dane pomyślnie zmienione", "success");
            },
        }
    );
    const onSubmit = () => {
        mutation.mutate();
    };

    const formik = useFormik({
        initialValues: {
            name: roomType.name,
            capacity: roomType.capacity,
            price: roomType.price,
            description: roomType.description,
        },
        validationSchema: roomTypeEditSchema,
        onSubmit,
    });

    return (
        <Accordion expanded={expanded}>
            <AccordionSummary onClick={() => setExpanded(!expanded)}>
                <Grid container direction="row" gap={2}>
                    <Grid item xs={5}>
                        <Typography> {roomType.name}</Typography>
                    </Grid>
                    <Grid
                        item
                        display="flex"
                        alignItems="center"
                        gap={1}
                        xs={3}
                    >
                        <Typography>{roomType.capacity} </Typography>
                        <PeopleAltIcon fontSize="small" />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography> {roomType.price} zł / noc</Typography>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Grid container gap={3}>
                        <Grid container item gap={5}>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Nazwa pokoju"
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.name &&
                                        Boolean(formik.errors.name)
                                    }
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    fullWidth
                                    name="capacity"
                                    label="Pojemność pokoju"
                                    value={formik.values.capacity}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.capacity &&
                                        Boolean(formik.errors.capacity)
                                    }
                                    helperText={
                                        formik.touched.capacity &&
                                        formik.errors.capacity
                                    }
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    fullWidth
                                    name="price"
                                    label="Cena pokoju"
                                    value={formik.values.price}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.price &&
                                        Boolean(formik.errors.price)
                                    }
                                    helperText={
                                        formik.touched.price &&
                                        formik.errors.price
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="description"
                                label="Opis pokoju"
                                value={formik.values.description}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.description &&
                                    Boolean(formik.errors.description)
                                }
                                helperText={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                            />
                        </Grid>
                        <Grid
                            container
                            mt={1}
                            spacing={3}
                            justifyContent="flex-end"
                        >
                            <Button variant="contained" type="submit">
                                zapisz
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </AccordionDetails>
        </Accordion>
    );
}
const RoomTypeList = () => {
    const { isLoading, data, error } = useQuery(
        "roomTypes",
        () => axios.get("/api/room/type/"),
        {
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return (
            <Grid maxWidth="xl">
                <Stack spacing={0.5}>
                    <Skeleton
                        variant={"rounded"}
                        animation={"wave"}
                        height={60}
                    />
                </Stack>
            </Grid>
        );
    }
    if (error) {
        return (
            <Grid maxWidth="xl">
                <Typography
                    align="center"
                    variant="h5"
                    color={theme.palette.error.main}
                >
                    Wystąpił błąd
                </Typography>
            </Grid>
        );
    }
    const roomTypesList = data.data.roomTypes;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    {roomTypesList.map((roomType) => (
                        <RoomTypeRow key={roomType._id} roomType={roomType} />
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default RoomTypeList;
