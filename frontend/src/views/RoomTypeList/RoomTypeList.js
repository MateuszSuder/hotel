import React, { useState } from "react";
import {
    Divider,
    TextField,
    Grid,
    Typography,
    styled,
    Fab,
    Stack,
    Skeleton,
    TableContainer,
    Table,
    TableBody,
    Button,
    TableRow,
    TableCell,
    Paper,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import axios from "axios";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import theme from "./../../components/theme/theme";
const AbsoluteFab = styled(Fab)`
    ${({ theme }) => `
    position: absolute;
    right: 2.5%;
    bottom: 2.5%;
  `}
`;
function RoomTypeRow({ roomType }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <TableRow>
            <TableCell>
                <Button onClick={() => setExpanded(!expanded)}>
                    Expand/Collapse
                </Button>
            </TableCell>
            <TableCell>
                <Accordion expanded={expanded}>
                    <AccordionSummary>{roomType.name}</AccordionSummary>
                    <AccordionDetails>
                        <form>
                            <TextField label="Name" value={roomType.name} />
                            <TextField
                                label="Description"
                                value={roomType.description}
                            />
                        </form>
                    </AccordionDetails>
                </Accordion>
            </TableCell>
        </TableRow>
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
    const onSubmit = () => {
        console.log(formik.values);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            capacity: 0,
            price: 0,
            description: "",
        },

        onSubmit,
    });
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
            <TableContainer component={Paper}>
                <Table aria-label="Dostępne pokoje">
                    <TableBody>
                        {roomTypesList.map((roomType) => (
                            <RoomTypeRow
                                key={roomType.id}
                                roomType={roomType}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={12} mb={2}>
                    <Typography letterSpacing={2} fontSize={22}>
                        Rodzaje pokojów
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}></Grid>
            </Grid>
        </>
    );
};

export default RoomTypeList;
