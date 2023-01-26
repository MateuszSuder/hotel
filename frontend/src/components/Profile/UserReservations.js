import React, {Fragment, useEffect, useRef, useState} from "react";
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
    TableCell, TableBody, Chip, Card, Divider, TextField, Button, Tooltip
} from "@mui/material";
import useAuth from "../../context/AuthProvider";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {Navigate, useLocation} from "react-router-dom";
import CustomTooltip from "../CustomTooltip";
import CustomModal from "../CustomModal";
import theme from "../theme/theme";
import TypographyLink from "../TypographyLink";
import {useFormik} from "formik";
import {object, string} from "yup";
import {requiredString} from "./Validation/validationSchemas";
import useSnackbar from "../../context/SnackbarProvider";

export const UserReservationStatusChip = ({status}) => {
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

export const UserReservationIssueStatusChip = ({status}) => {
    switch (status) {
        case "RESOLVED":
            return (
                <Chip label="rozwiązany" color="success"/>
            )
        case "ONGOING":
            return (
                <Chip label="w trakcie" color="primary"/>
            )
        default:
            return (<></>)
    }
}

const messageSchema = object({
    message: string().required(requiredString).max(250)
})

const UserReservationIssueView = ({reservationId, issueId, open, setOpen}) => {
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();
    const location = useLocation();
    const messageEndRef = useRef(null);
    const {
        data,
        isLoading,
        error
    } = useQuery(`reservation-${reservationId}-issue-${issueId}`, () => axios.get(`/api/reservation/${reservationId}/issue/${issueId}`), {
        retry: false,
        refetchOnWindowFocus: true,
        onSuccess: () => {
            messageEndRef.current?.scrollIntoView();
        }
    });

    const isCustomer = !location.pathname.includes("admin");

    const mutation = useMutation(() => axios.post(`/api/reservation/${reservationId}/issue/${issueId}`, {
        ...formik.values
    }), {
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [`reservation-${reservationId}-issue-${issueId}`]});
            formik.resetForm()
        },
        onError: () => {
            addSnackbar("Wystąpił błąd. Twoja wiadomość nie została wysłana.", "error")
        }
    })

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [data])

    useEffect(() => {
        console.log("ref");
    }, [messageEndRef])

    const onSubmit = () => {
        mutation.mutate();
    }

    const formik = useFormik({
        initialValues: {
            message: ""
        },
        validationSchema: messageSchema,
        onSubmit
    })

    if (isLoading) {
        return (
            <Stack>
                <Skeleton variant="text"/>
            </Stack>
        )
    }

    if (error) {
        return (
            <Navigate to={"/"}/>
        )
    }

    const issue = data.data;

    const isOwner = (sender) => {
        if(isCustomer) {
            return sender === "CUSTOMER";
        }

        return sender === "EMPLOYEE";
    }

    return (
        <CustomModal open={open} setOpen={setOpen} customStyle={{width: "65vw"}}>
            <Grid container xs={12} flexDirection="column" justifyContent="space-between" py={2}>
                <Grid item mb={2}>
                    <Typography variant="h4" align="center">
                        {issue.issueTopic}
                    </Typography>
                </Grid>
                <Grid item sx={{ height: "400px" }}>
                    <Paper elevation={4} sx={{ height: "100%" }}>
                        <Grid container sx={{ height: "100%" }}>
                            <Grid container item flexDirection="column" sx={{ height: "85%", overflowY: "scroll" }} p={1} xs={12} wrap="nowrap" gap={1}>
                                {
                                    issue.messages.map((message, i) => (
                                        <Grid key={`message-${i}`} item container justifyContent={isOwner(message.sender) ? "flex-end" : "flex-start"} sx={{ width: "100%" }}>
                                            <Tooltip followCursor title={new Date(message.dateSent).toLocaleString()}>
                                                <Chip label={message.message} color="primary" variant={isOwner(message.sender) ? "filled" : "outlined"}/>
                                            </Tooltip>
                                        </Grid>
                                    ))
                                }
                                <div ref={messageEndRef} />
                            </Grid>
                            <Grid item container alignSelf="flex-end" sx={{ height: "auto" }}>
                                <form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: "100%" }}>
                                    <Grid item container flexDirection="row" justifyContent="space-between">
                                        <Grid item xs={11}>
                                            <TextField
                                                fullWidth
                                                name="message"
                                                id="message"
                                                label="wiadomość..."
                                                value={formik.values.message}
                                                error={
                                                    formik.touched.message && Boolean(!!formik.errors.message)
                                                }
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                        <Grid item container justifyContent="center" alignItems="center" xs={1}>
                                            <Button type="submit" variant="contained" sx={{ height: "100%", width: "100%" }}>
                                                Wyślij
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

const UserReservationViewIssues = ({reservationId}) => {
    const [issueId, setIssueId] = useState(null);

    const {
        data,
        isLoading,
        error
    } = useQuery(`reservation-issues-${reservationId}`, () => axios.get(`/api/reservation/${reservationId}/issue`), {
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return (
            <Stack>
                <Skeleton variant="text"/>
            </Stack>
        )
    }

    if (error) {
        return (
            <Navigate to={"/"}/>
        )
    }

    const issues = data.data.issues

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista rezerwacji" sx={{tableLayout: "fixed"}}>
                <TableHead>
                    <TableRow>
                        <TableCell width="50%">Id rezerwacji</TableCell>
                        <TableCell width="30%">Temat</TableCell>
                        <TableCell width="20%">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {issues.map((issue, i) => (
                        <TableRow
                            key={issue._id}
                            hover
                            sx={{cursor: "pointer"}}
                            onClick={() => setIssueId(issue._id)}
                        >
                            <TableCell>
                                <CustomTooltip content={issue._id}/>
                            </TableCell>
                            <TableCell>
                                <CustomTooltip content={issue.issueTopic}/>
                            </TableCell>
                            <TableCell>
                                <UserReservationIssueStatusChip status={issue.status}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {!!issueId && <UserReservationIssueView reservationId={reservationId} issueId={issueId} open={!!issueId}
                                                    setOpen={() => setIssueId(null)}/>}
        </TableContainer>
    )
}

const issueSchema = object({
    issueTopic: string().required(requiredString).max(40, "Temat jest za długi")
})

const UserReservationViewAddIssue = ({reservationId, open, setOpen}) => {
    const queryClient = useQueryClient();
    const {addSnackbar} = useSnackbar();
    const { user } = useAuth();
    const mutation = useMutation(() => axios.post(`/api/reservation/${reservationId}/issue`, {
        ...formik.values
    }), {
        onSuccess: async () => {
            addSnackbar("Zgłoszono problem", "success");
            await queryClient.resetQueries({queryKey: [`reservation-issues-${reservationId}`]});
            setOpen(false);
        }
    })

    const onSubmit = () => {
        mutation.mutate();
    }

    const formik = useFormik({
        initialValues: {
            issueTopic: ""
        },
        validationSchema: issueSchema,
        onSubmit
    })

    return (
        <CustomModal open={open} setOpen={setOpen}>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Grid container gap={2} flexDirection="column" alignItems="center">
                    <Grid item>
                        <Typography variant="h6" mb={2}>
                            Zgłoś problem z rezerwacją {reservationId}
                        </Typography>
                    </Grid>
                    <Grid item container xs={12}>
                        <TextField
                            fullWidth
                            name="issueTopic"
                            id="issueTopic"
                            label="Temat problemu"
                            value={formik.values.issueTopic}
                            error={
                                formik.touched.issueTopic && Boolean(!!formik.errors.issueTopic)
                            }
                            helperText={formik.touched.issueTopic && formik.errors.issueTopic}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained">
                            Zgłoś problem
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography>
                            W następnym kroku będziesz mógł dodać wiadomość do problemu
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </CustomModal>
    )
}

const UserReservationView = ({reservation, open, setOpen, hideAddIssue}) => {
    const [addIssueModal, setAddIssueModal] = useState(false);
    const roomId = reservation.roomId;
    const {data, isLoading, error} = useQuery(`room-${roomId}`, () => axios.get(`/api/room/${roomId}`), {
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isLoading) {
        return (
            <Stack>
                <Skeleton variant="text"/>
            </Stack>
        )
    }

    if (error) {
        return (
            <Navigate to={"/"}/>
        )
    }

    const room = data.data[0];

    return (
        <CustomModal open={open} setOpen={setOpen} customStyle={{width: "60vw"}}>
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
                    <Divider/>
                </Grid>
                <Grid item>
                    <Typography align="center" mt={2}>
                        Identyfikator rezerwacji: {reservation._id}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography align="center" mt={2}>
                        Identyfikator użytkownika: {reservation.userId}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography align="center" mt={2}>
                        {new Date(reservation.startAt).toLocaleDateString()} - {new Date(reservation.endAt).toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography align="center" my={2}>
                        Zapłacono: {reservation.totalPrice}zł
                    </Typography>
                    <Divider/>
                </Grid>
                <Grid item>
                    <Typography align="center" mt={2} variant={"h4"}>
                        Problemy z rezerwacją
                    </Typography>
                </Grid>
                <Grid item>
                    {!hideAddIssue && (
                        <TypographyLink align="center" variant={"body2"} color={theme.palette.error.main}
                                        onClick={() => setAddIssueModal(true)}>
                            zgłoś problem
                        </TypographyLink>
                    )}
                </Grid>
                <UserReservationViewIssues reservationId={reservation._id}/>
            </Grid>
            {addIssueModal && <UserReservationViewAddIssue reservationId={reservation._id} open={addIssueModal}
                                                           setOpen={setAddIssueModal}/>}
        </CustomModal>
    )
}

const UserReservationRow = ({reservation, hideAddIssue}) => {
    const [modal, setModal] = useState(false);

    const selectReservation = () => {
        setModal(true);
    }

    return (
        <>
            <TableRow
                hover
                sx={{cursor: "pointer"}}
                onClick={selectReservation}
            >
                <TableCell>
                    <CustomTooltip content={new Date(reservation.startAt).toLocaleDateString()}/>
                </TableCell>
                <TableCell>
                    <CustomTooltip content={new Date(reservation.endAt).toLocaleDateString()}/>
                </TableCell>
                <TableCell>
                    <CustomTooltip content={`${reservation.totalPrice}zł`}/>
                </TableCell>
                <TableCell>
                    <UserReservationStatusChip status={reservation.status}/>
                </TableCell>
            </TableRow>
            {modal && <UserReservationView open={modal} setOpen={setModal} reservation={reservation} hideAddIssue={hideAddIssue} />}
        </>
    );
};


const UserReservations = ({hideAddIssue = false}) => {
    const {user} = useAuth();
    const {data, isLoading, error} = useQuery(`user-${user._id}-reservations`, () => axios.get(`/api/reservation`));

    if (isLoading) {
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
                <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
            </Stack>
        )
    }

    if (error) {
        return (
            <Navigate to={"/"}/>
        )
    }
    const reservations = data.data.reservations;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista rezerwacji" sx={{tableLayout: "fixed"}}>
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
                            hideAddIssue={hideAddIssue}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserReservations;
