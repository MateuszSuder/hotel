import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import RoomListOptions from "./../../views/RoomList/RoomListOptions";
import RoomListTable, {
    RoomContext,
} from "./../../views/RoomList/RoomListTable";
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
import { roomSchema } from "../Profile/Validation/validationSchemas";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import theme from "./../theme/theme";
import EditIcon from "@mui/icons-material/Edit";
import RoomList from "../../views/RoomList/RoomList";
import useSnackbar from "../../context/SnackbarProvider";
import { useMutation } from "react-query";
const AbsoluteFab = styled(Fab)`
    ${({ theme }) => `
    position: absolute;
    right: 2.5%;
    bottom: 2.5%;
  `}
`;

const RoomTypes = ({ formik }) => {
    const { isLoading, data, error } = useQuery(
        "room-types",
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
                    Boolean(formik.errors.roomTypeId)
                }
            >
                {roomTypesList.map((s) => (
                    <MenuItem value={s._id} key={s._id}>
                        {s.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={!!formik.errors.roomTypeId}>
                {formik.touched.roomTypeId && formik.errors.roomTypeId}
            </FormHelperText>
        </FormControl>
    );
};

const AdminAddRoom = ({ setModal, room = null }) => {
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();

    const onSubmit = () => {
        isEditing ? editMutation.mutate() : addMutation.mutate();

    };

    const formik = useFormik({
        initialValues: {
            roomNumber: room?.roomNumber || "",
            floor: room?.floor || "",
            roomTypeId: room?.roomTypeId || "",
        },
        validationSchema: roomSchema,
        onSubmit,
    });

    const editMutation = useMutation(
        () =>
            axios.put(`/api/room/${room._id}`, {
                ...formik.values,
            }),
        {
            onError: (error) => {
                if(error.response.status === 409) {
                    addSnackbar("Pokój z takim numerem pokoju już istnieje", "error");
                    return;
                }
                const message = error.response.data.errors[0];
                addSnackbar(message, "error");
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["rooms"],
                });

                addSnackbar("Dane pomyślnie zmienione", "success");

                setModal(false);
            },
        }
    );

    const addMutation = useMutation(
        () =>
            axios.post(`/api/room`, {
                ...formik.values,
            }),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["rooms"],
                });
                setModal(false);
            },
            onError: (err) => {
                if(err.response.status === 409) {
                    addSnackbar("Pokój z takim numerem pokoju już istnieje", "error");
                    return;
                }
                addSnackbar("Wystąpił błąd podczas dodawania danych.", "error");
            },
        }
    );

    const isEditing = !!room;

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            {isEditing ? "Edytuj pokój" : "Dodaj nowy pokój"}
                        </Typography>
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
                            {isEditing ? "Edytuj" : "Dodaj"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

const AdminRoomsEdit = ({ editRoom }) => {
    const room = useContext(RoomContext);

    return (
        <Tooltip title="Edytuj pokój">
            <EditIcon onClick={() => editRoom(room)} />
        </Tooltip>
    );
};

const AdminRooms = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const setModal = (val) => {
        if (!val) setSelectedRoom(null);
        setOpenModal(val);
    };

    const addRoom = () => {
        setSelectedRoom(null);
        setOpenModal(true);
    };

    const editRoom = (room) => {
        setSelectedRoom(room);
        setOpenModal(true);
    };

    return (
        <>
            <Tooltip title="Dodaj pokój" followCursor>
                <AbsoluteFab color="primary" aria-label="add" onClick={addRoom}>
                    <Add />
                </AbsoluteFab>
            </Tooltip>
            <CustomModal open={openModal} setOpen={setModal}>
                <AdminAddRoom setModal={setOpenModal} room={selectedRoom} />
            </CustomModal>
            <RoomList>
                <AdminRoomsEdit editRoom={editRoom} room={selectedRoom} />
            </RoomList>
        </>
    );
};

export default AdminRooms;
