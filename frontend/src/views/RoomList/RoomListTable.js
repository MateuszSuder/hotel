import React, {useEffect, useState} from 'react';
import {
    Grid,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import roomList from "../../mock/roomList";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RoomListOptions from "./RoomListOptions";

const RoomListTable = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 4000)
    }, [])

    if(loading)
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
            </Stack>
        )

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="Dostępne pokoje">
                    <TableBody>
                        {roomList.rooms.map(room => (
                            <TableRow key={room.roomNumber} hover>
                                <TableCell width="70%">
                                    <Typography>
                                        {room.name}
                                    </Typography>
                                </TableCell>
                                <TableCell width="15%">
                                    <Grid container display="flex" gap={1}>
                                        <Typography>
                                            {room.capacity}
                                        </Typography>
                                        <PeopleAltIcon fontSize="small"/>
                                    </Grid>
                                </TableCell>
                                <TableCell width="15%">
                                    <Grid container display="flex" gap={1}>
                                        <Typography>
                                            {room.price} zł / noc
                                        </Typography>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default RoomListTable;