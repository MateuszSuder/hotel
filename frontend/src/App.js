import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import RoomList from "./views/RoomList";
import Profile from "./views/Profile";
import Login from "./views/Login/Login";
import React from "react";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route element={<Layout/>}>
                  <Route path="/" element={<RoomList/>}/>
                  <Route path="/profile" element={<Profile/>}/>
              </Route>
              <Route path="/login" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
