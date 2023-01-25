import React from "react";
import { People } from "@mui/icons-material";
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
        path: "rezerwacje",
        icon: <People />,
        component: UserReservations,
    },
    {
        name: "2fa",
        path: "autoryzacja",
        icon: <People />,
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
