import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Grid,
    Link,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import theme from "../../../theme/theme";
import React, {useState} from "react";
import AdminUserAccordion from "./AdminUserAccordion";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import useSnackbar from "../../../../context/SnackbarProvider";
import {UserReservationStatusChip} from "../../../Profile/UserReservations";
import FullWidthButton from "../../../FullWidthButton";

const AdminUserReservation = ({item: reservation}) => {
    const [expanded, setExpanded] = useState(false);
    const queryClient = useQueryClient();
    const { addSnackbar } = useSnackbar();

    const deleteReservationMutation = useMutation(() => axios.delete(`/api/reservation/${reservation._id}`), {
        onSuccess: async () => {
            setExpanded(false);
            addSnackbar("Rezerwacja usunięta", "success");
            await queryClient.invalidateQueries({queryKey: [`user-${reservation.userId}-reservations`]});
        },
        onError: () => {
            addSnackbar("Nie udało się usunąć rezerwacji", "error")
        }
    })

    const endReservationMutation = useMutation(() => axios.put(`/api/reservation/${reservation._id}`), {
        onSuccess: async () => {
            setExpanded(false);
            addSnackbar("Rezerwacja zakończona", "success");
            await queryClient.invalidateQueries({queryKey: [`user-${reservation.userId}-reservations`]});
        },
        onError: () => {
            addSnackbar("Nie udało się zakończyć rezerwacji", "error")
        }
    })

    return (
        <Accordion expanded={expanded}>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setExpanded(!expanded)}
            >
                <Grid container>
                    <Grid item xs={8}>
                        <Typography>{reservation._id}</Typography>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" justifyContent="center">
                        <UserReservationStatusChip status={reservation.status}/>
                    </Grid>
                </Grid>

            </AccordionSummary>
            <AccordionDetails>
                <Grid container flexDirection="column">
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
                            {new Date(reservation.startAt).toLocaleDateString()} - {new Date(reservation.endAt).toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography align="center" my={2}>
                            Zapłacono: {reservation.totalPrice}zł
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid container item>
                        <Grid item xs={6}>
                            <FullWidthButton variant="contained" color="error" onClick={() => deleteReservationMutation.mutate()}>Usuń rezerwację</FullWidthButton>
                        </Grid>
                        <Grid item xs={6}>
                            <FullWidthButton variant="contained" color="primary" onClick={() => endReservationMutation.mutate()}>Zakończ rezerwację</FullWidthButton>
                        </Grid>
                    </Grid>
                </Grid>


            </AccordionDetails>
        </Accordion>
    )
}

const AdminUserReservations = ({userId}) => {
    const { data, isLoading, error } = useQuery(`user-${userId}-reservations`, () => axios.get(`/api/reservation?userId=${userId}`), {
        refetchOnWindowFocus: false
    });


    if(isLoading) return (
        <Skeleton variant={"rounded"} animation={"wave"} height={60}/>
    )

    if(error) {
        return (
            <Typography align="center" variant="h5" color={theme.palette.error.main}>
                Wystąpił błąd
            </Typography>
        )
    }

    const reservations = data.data.reservations;

    return (
        <AdminUserAccordion
            list={reservations}
            ListComponent={AdminUserReservation}
            title={"Rezerwacje użytkownika"}
            listEmptyMessage={"Brak rezerwacji"}
        />
    )
}

export default AdminUserReservations;