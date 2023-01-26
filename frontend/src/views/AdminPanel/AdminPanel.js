import React from 'react';
import {Bookmarks, People, Bed} from "@mui/icons-material";
import AdminRooms from "../../components/AdminPanel/AdminRooms";
import AdminReservations from "../../components/AdminPanel/AdminReservations";
import PageWithMenu from "../../components/PageWithMenu/PageWithMenu";
import AdminUsers from "../../components/AdminPanel/AdminUsers/AdminUsers";

const subPages = [
    {name: "Użytkownicy", path: "users", icon: <People/>, component: AdminUsers},
    {name: "Pokoje", path: "rooms", icon: <Bed/>, component: AdminRooms},
    {name: "Rezerwacje", path: "reservations", icon: <Bookmarks/>, component: AdminReservations}
]


const AdminPanel = () => {
    return (
        <PageWithMenu subPages={subPages}/>
    );
};

export default AdminPanel;