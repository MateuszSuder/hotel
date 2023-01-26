import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import RoomListOptions from "./../../views/RoomList/RoomListOptions";
import RoomListTable from "./../../views/RoomList/RoomListTable";
import {
    Grid,
    Tooltip,
    styled,
    Fab,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    FormHelperText,
    Button,
    Typography,
    TextField,
    Skeleton,
    Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CustomModal from "./../CustomModal";
import { roomAddSchema } from "../Profile/Validation/validationSchemas";
import axios from "axios";
import { useQuery } from "react-query";
import theme from "./../theme/theme";
const AbsoluteFab = styled(Fab)`
    ${({ theme }) => `
    position: absolute;
    right: 2.5%;
    bottom: 2.5%;
  `}
`;

const RoomTypes = ({ formik }) => {
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
        <FormControl fullWidth>
            <InputLabel>Typ pokoju</InputLabel>

            <Select
                name="roomTypeId"
                label="Typ pokoju"
                value={formik.values.roomTypeId}
                onChange={(e) =>
                    formik.setFieldValue("roomTypeId", e.target.value)
                }
                error={
                    formik.touched.roomTypeId &&
                    Boolean(!!formik.errors.roomTypeId)
                }
            >
                {roomTypesList.map((s) => (
                    <MenuItem value={s._id} key={s._id}>
                        {s.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={formik.errors.roomTypeId}>
                {formik.touched.roomTypeId && formik.errors.roomTypeId}
            </FormHelperText>
        </FormControl>
    );
};
const AdminAddRoom = ({ setModal }) => {
    const onSubmit = () => {
        console.log(formik.values);
    };

    const formik = useFormik({
        initialValues: {
            roomNumber: "",
            floor: "",
            roomTypeId: "",
        },
        validationSchema: roomAddSchema,
        onSubmit,
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Dodaj nowy pokój</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="roomNumber"
                            label="Numer pokoju"
                            value={formik.values.roomNumber}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.roomNumber &&
                                Boolean(formik.errors.roomNumber)
                            }
                            helperText={
                                formik.touched.roomNumber &&
                                formik.errors.roomNumber
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="floor"
                            label="Piętro"
                            value={formik.values.floor}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.floor &&
                                Boolean(formik.errors.floor)
                            }
                            helperText={
                                formik.touched.floor && formik.errors.floor
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <RoomTypes formik={formik} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            size="large"
                        >
                            Dodaj
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};
const AdminRooms = () => {
    const [openModal, setOpenModal] = useState(false);
    const addRoom = () => {
        setOpenModal(true);
    };
    return (
        <>
            <Tooltip title="Dodaj pokój" followCursor>
                <AbsoluteFab color="primary" aria-label="add" onClick={addRoom}>
                    <Add />
                </AbsoluteFab>
            </Tooltip>
            <CustomModal open={openModal} setOpen={setOpenModal}>
                <AdminAddRoom setModal={setOpenModal} />
            </CustomModal>
            <Grid container>
                <Grid container item xs={8}>
                    <RoomListOptions />
                </Grid>
                <Grid container item xs={12}>
                    <RoomListTable />
                </Grid>
            </Grid>
        </>
    );
};

export default AdminRooms;
