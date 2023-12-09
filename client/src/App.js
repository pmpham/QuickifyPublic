import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MusicRoom from "./pages/MusicRoom/MusicRoom";
import Login from "../src/pages/Login";
import HomePage from "./pages/HomePage";
import useAuth from "./hooks/useAuth";
import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";
import RoomCreationName from "./pages/RoomCreation/RoomCreationName";
import RoomCreationDetail from "./pages/RoomCreation/RoomCreationDetail";

import "./App.css";
import PublicRooms from "./pages/PublicRooms";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const accessToken = useAuth(code);

  return code ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage accessToken={accessToken} />} />
        <Route path="music" element={<MusicRoom accessToken={accessToken} />} />
        <Route
          path="createRoom"
          element={<RoomCreationName accessToken={accessToken} />}
        />
        <Route
          path="createRoomDetail/:roomName"
          element={<RoomCreationDetail accessToken={accessToken} />}
        />
        <Route
          path="shopping"
          element={<ShoppingPage accessToken={accessToken} />}
        />
        <Route
          path="public"
          element={<PublicRooms accessToken={accessToken} />}
        />
      </Routes>
    </BrowserRouter>
  ) : (
    <Login />
  );
}

export default App;
