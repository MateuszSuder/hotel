import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RoomList from "./views/RoomList/RoomList";
import Profile from "./views/Profile";
import Login from "./views/Login/Login";
import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
          <BrowserRouter>
              <Routes>
                  <Route element={<Layout/>}>
                      <Route path="/" element={<RoomList/>}/>
                      <Route path="/profile" element={<Profile/>}/>
                  </Route>
                  <Route path="/login" element={<Login/>}/>
              </Routes>
          </BrowserRouter>
      </LocalizationProvider>
  );
}

export default App;
