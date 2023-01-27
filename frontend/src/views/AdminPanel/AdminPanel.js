import React from 'react';
import {Bookmarks, People, Bed} from "@mui/icons-material";
import AdminRooms from "../../components/AdminPanel/AdminRooms";
import AdminReservations from "../../components/AdminPanel/AdminReservations";
import PageWithMenu from "../../components/PageWithMenu/PageWithMenu";
import AdminUsers from "../../components/AdminPanel/AdminUsers/AdminUsers";
import AdminRoomTypes from "../../components/AdminPanel/AdminRoomTypes";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import useAuth from "../../context/AuthProvider";
import {Navigate} from "react-router-dom";

const subPages = [
    {name: "Użytkownicy", path: "users", icon: <People/>, component: AdminUsers},
    {name: "Typy pokoi", path: "roomTypes", icon: <MeetingRoomIcon />, component: AdminRoomTypes},
    {name: "Pokoje", path: "rooms", icon: <Bed/>, component: AdminRooms},
    {name: "Rezerwacje", path: "reservations", icon: <Bookmarks/>, component: AdminReservations},
]

const AdminPanel = () => {
    const { user } = useAuth();

    if(!user || user.role === "USER") {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <PageWithMenu subPages={subPages}/>
    );
};

export default AdminPanel;
