import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RoomList from "./views/RoomList/RoomList";
import Profile from "./views/Profile";
import Login from "./views/Login/Login";
import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import Register from "./views/Login/Register";
import Room from "./views/Room/Room";
import AdminPanel from "./views/AdminPanel/AdminPanel";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./context/AuthProvider";
import {SnackbarProvider} from "./context/SnackbarProvider";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
                <AuthProvider>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"pl"}>
                        <BrowserRouter>
                            <Routes>
                                <Route element={<Layout container={true}/>}>
                                    <Route path="/" element={<RoomList/>}/>
                                    <Route path="/room/:roomId" element={<Room/>}/>
                                </Route>
                                <Route element={<Layout container={false}/>}>
                                    <Route
                                        path="/profile"
                                        element={<Navigate to="/profile/info"/>}
                                    />
                                    <Route path="/profile/:subPage" element={<Profile/>}/>
                                    <Route
                                        path="/admin"
                                        element={<Navigate to="/admin/users"/>}
                                    />
                                    <Route
                                        path="/admin/:subPage"
                                        element={<AdminPanel/>}
                                    />
                                </Route>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                            </Routes>
                        </BrowserRouter>
                    </LocalizationProvider>
                </AuthProvider>
            </SnackbarProvider>
        </QueryClientProvider>
    )
        ;
}

export default App;
