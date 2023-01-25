import React from "react";
import { People, Security, Bookmarks } from "@mui/icons-material";
import UserInfo from "../components/Profile/UserInfo";
import UserReservations from "../components/Profile/UserReservations";
import PageWithMenu from "../components/PageWithMenu/PageWithMenu";
import Auth from "../components/Profile/Auth";
import {Navigate} from "react-router-dom";
import useAuth from "../context/AuthProvider";

const subPages = [
    {
        name: "Profil",
        path: "info",
        icon: <People />,
        component: UserInfo,
    },
    {
        name: "Rezerwacje",
        path: "reservations",
        icon: <Bookmarks />,
        component: UserReservations,
    },
    {
        name: "Autoryzacja",
        path: "authorization",
        icon: <Security />,
        component: Auth,
    },
];

const Profile = () => {
    const { user } = useAuth();

    if(!user) return (
        <Navigate to="/login" />
    )

    return <PageWithMenu subPages={subPages} />;
};

export default Profile;
