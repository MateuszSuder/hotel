import React, {useState} from "react";
import {
    Grid,
    Typography,
    Box,
    Skeleton,
    Stack,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell, TableBody, Chip, Card, Divider
} from "@mui/material";
import useAuth from "../../context/AuthProvider";
import {useQuery} from "react-query";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import CustomTooltip from "../CustomTooltip";
import CustomModal from "../CustomModal";

export const UserReservationStatusChip = ({ status }) => {
    switch (status) {
        case "RESERVED":
            return (
                <Chip label="zarezerwowano" color="primary"/>
            )
        case "ENDED":
            return (
                <Chip label="zakończona" color="error"/>
            )
        default:
            return (<></>)
    }
}

const UserReservationView = ({ reservation, open, setOpen }) => {
    const roomId = reservation.roomId;
    const {data, isLoading, error} = useQuery(`room-${roomId}`, () => axios.get(`/api/room/${roomId}`), {
        retry: false,
        refetchOnWindowFocus: false
    });

    if(isLoading) {
        return (
            <Stack>
                <Skeleton variant="text" />
            </Stack>
        )
    }

    if(error) {
        return (
            <Navigate to={"/"} />
        )
    }

    const room = data.data[0];

    return (
        <CustomModal open={open} setOpen={setOpen} customStyle={{ width: "60vw" }}>
            <Grid container flexDirection="column" my={3}>
                <Grid item mb={2}>
                    <Typography align="center" variant="h2">
                        {room.name}
                    </Typography>
                </Grid>

                <Card elevation={4}>
                    <Grid item container my={2}>
                        <Grid item my={2} xs={12}>
                            <Typography align="center" variant="body1">
                                {room.description}
                            </Typography>
                        </Grid>
                        <Grid item container justifyContent="center" gap={2}>
                            <Grid item xs={5}>
                                <Typography align="right">Piętro</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>{room.floor}</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            justifyContent="center"
                            gap={2}
                        >
                            <Grid item xs={5} align="right">
                                <Typography>Numer pokoju</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>{room.roomNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            justifyContent="center"
                            gap={2}
                        >
                            <Grid item xs={5} align="right">
                                <Typography>Cena za noc</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>{room.price} zł</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                <Grid item mt={2}>
                    <Typography align="center" variant="h4" my={2}>
                        Dane rezerwacji
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item>
                    <Typography align="center" mt={2}>
                        {new Date(reservation.startAt).toLocaleDateString()} - {new Date(reservation.endAt).toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography align="center" mt={2}>
                        Zapłacono: {reservation.totalPrice}zł
                    </Typography>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

const UserReservationRow = ({ reservation }) => {
    const [modal, setModal] = useState(false);

    const selectReservation = () => {
        setModal(true);
    }

    return (
        <>
            <TableRow
                hover
                sx={{ cursor: "pointer" }}
                onClick={selectReservation}
            >
                <TableCell>
                    <CustomTooltip content={new Date(reservation.startAt).toLocaleDateString()} />
                </TableCell>
                <TableCell>
                    <CustomTooltip content={new Date(reservation.endAt).toLocaleDateString()} />
                </TableCell>
                <TableCell>
                    <CustomTooltip content={`${reservation.totalPrice}zł`} />
                </TableCell>
                <TableCell>
                    <UserReservationStatusChip status={reservation.status} />
                </TableCell>
            </TableRow>
            { modal && <UserReservationView open={modal} setOpen={setModal} reservation={reservation} /> }
        </>
    );
};


const UserReservations = () => {
    const { user } = useAuth();
    const { data, isLoading, error } = useQuery(`user-${user._id}-reservations`, () => axios.get(`/api/reservation`), {
        refetchOnWindowFocus: false
    });

    if(isLoading) {
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
            </Stack>
        )
    }

    if(error) {
        return (
            <Navigate to={"/"} />
        )
    }
    const reservations = data.data.reservations;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista rezerwacji" sx={{ tableLayout: "fixed" }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="30%">Data rozpoczęcia</TableCell>
                        <TableCell width="30%">Data zakończenia</TableCell>
                        <TableCell width="20%">Zapłacono</TableCell>
                        <TableCell width="20%">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map((reservation, i) => (
                        <UserReservationRow
                            key={`reservation-${i}`}
                            reservation={reservation}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserReservations;
