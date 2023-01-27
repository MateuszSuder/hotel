import React, { useState } from "react";
import {
    TextField,
    Grid,
    Typography,
    Stack,
    Skeleton,
    Button,
    styled,
    Fab,
    Tooltip,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import { Add } from "@mui/icons-material";
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
import CustomModal from "./../../components/CustomModal";
import { roomAddSchema } from "./../../components/Profile/Validation/validationSchemas";
import AdminAddRoomTypeForm from "./../../components/Form/AdminAddRoomTypeForm";

const AbsoluteFab = styled(Fab)`
    ${({ theme }) => `
    position: absolute;
    right: 2.5%;
    bottom: 2.5%;
  `}
`;

const AdminAddRoomType = ({ setModal }) => {
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();
    const onSubmit = () => {
        mutation.mutate();
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            capacity: 0,
            price: 0,
            description: "",
        },
        validationSchema: roomTypeEditSchema,
        onSubmit,
    });
    const mutation = useMutation(
        () =>
            axios.post(`/api/room/type`, {
                ...formik.values,
            }),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["roomTypes"],
                });
                setModal(false);
            },
            onError: () => {
                addSnackbar("Wystąpił błąd podczas dodawania danych.", "error");
            },
        }
    );
    return (
        <Grid container spacing={3}>
            <Grid container item>
                <Typography variant="h4">Dodaj nowy typ</Typography>
            </Grid>
            <Grid container item>
                <AdminAddRoomTypeForm formik={formik} />
            </Grid>
        </Grid>
    );
};

const RoomTypeRow = ({ roomType }) => {
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
                setExpanded(false);
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
                <AdminAddRoomTypeForm formik={formik} />
            </AccordionDetails>
        </Accordion>
    );
};
const RoomTypeList = () => {
    const [openModal, setOpenModal] = useState(false);
    const addRoomType = () => {
        setOpenModal(true);
    };

    const setModal = (val) => {
        setOpenModal(val);
    };
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
            <Tooltip title="Dodaj typ" followCursor>
                <AbsoluteFab
                    color="primary"
                    aria-label="add"
                    onClick={addRoomType}
                >
                    <Add />
                </AbsoluteFab>
            </Tooltip>
            <CustomModal open={openModal} setOpen={setModal}>
                <AdminAddRoomType setModal={setOpenModal} />
            </CustomModal>

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
