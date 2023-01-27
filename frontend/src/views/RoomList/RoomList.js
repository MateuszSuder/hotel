import React, {createContext, useState} from 'react';
import {Divider, Grid, Typography} from "@mui/material";
import RoomListTable from "./RoomListTable";
import RoomListOptions from "./RoomListOptions";

export const RoomListContext = createContext({});

const RoomList = ({children}) => {
    const [rooms, setRooms] = useState([]);

    return (
        <>
            <Grid container>
                <Grid item xs={12} mb={2}>
                    <Typography letterSpacing={2} fontSize={22}>
                        Dostępne pokoje
                    </Typography>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <RoomListContext.Provider value={{rooms, setRooms}}>
                        <RoomListOptions/>
                        <RoomListTable>
                            {children}
                        </RoomListTable>
                    </RoomListContext.Provider>
                </Grid>
            </Grid>
        </>
    );
};

export default RoomList;