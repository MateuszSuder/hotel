import React, {createContext, useContext} from "react";
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
    Typography,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import axios from "axios";
import {RoomListContext} from "./RoomList";

export const RoomContext = createContext({});

const RoomTableRow = ({ room, selectRoom, children }) => {
    return (
        <TableRow
            key={room.roomNumber}
            hover
            onClick={() => selectRoom(room._id)}
            sx={{ cursor: "pointer" }}
        >
            <TableCell width="70%">
                <Typography>{room.name}</Typography>
            </TableCell>
            <TableCell width="15%">
                <Grid container display="flex" gap={1}>
                    <Typography>{room.capacity}</Typography>
                    <PeopleAltIcon fontSize="small" />
                </Grid>
            </TableCell>
            <TableCell width="15%">
                <Grid container display="flex" gap={1}>
                    <Typography>{room.price} zł / noc</Typography>
                </Grid>
            </TableCell>
            <TableCell width="15%" onClick={e => e.stopPropagation()}>
                <RoomContext.Provider value={room}>
                    { children }
                </RoomContext.Provider>
            </TableCell>
        </TableRow>
    );
};

const RoomListTable = ({ children }) => {
    const { rooms, setRooms } = useContext(RoomListContext);
    const { isLoading } = useQuery("rooms", () => axios.get(`/api/room`),
        {
            onSuccess: (data) => {
                setRooms(data.data)
            },
            refetchOnWindowFocus: false
        }
    );
    const navigate = useNavigate();

    const selectRoom = (roomId) => {
        navigate(`/room/${roomId}`);
    };

    if (isLoading)
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
            </Stack>
        );

    if(!rooms?.rooms) return (
        <></>
    )

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="Dostępne pokoje">
                    <TableBody>
                        {rooms.rooms.map((room) => (
                            <RoomTableRow
                                room={room}
                                selectRoom={selectRoom}
                                key={room._id}
                            >
                                { children }
                            </RoomTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default RoomListTable;
