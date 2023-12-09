import React, { useState } from "react";
import {
    AppBar, Typography, Avatar, Stack
} from "@mui/material";
import { purple } from "../../styles/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SongDisplayLight from "../SongDisplay/SongDisplayLight";
import { Scrollbar } from "react-scrollbars-custom";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const ShoppingHeader = ({
  pictureUrl,
  cart,
  deleteHandler,
  ownedPlaylists,
  exportHandler,
  createPlaylist,
}) => {
  const [cartState, setCartState] = useState(false);
  const [playlistDropState, setPlaylistDropState] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylist] = useState("");
  const navigate = useNavigate();

  const container = {
    position: "relative",
    width: "1400px",
    background: purple[200],
    borderRadius: "8px",
    padding: "24px 10px 24px 24px",
    marginLeft: "auto",
    marginRight: "40px",
    height: "800px",
    zIndex: 10000,
  };

  const playlistsContainer = {
    position: "absolute",
    width: "200px",
    background: purple[700],
    borderRadius: "8px",
    height: "250px",
    zIndex: 10000,
    padding: "10px",
  };

  return (
    <div style={{ overflow: "visible", maxHeight: "64px", zIndex: 5000 }}>
      <AppBar
        position="sticky"
        elevation={0}
        style={{
          backgroundColor: purple[500],
          maxWidth: true,
          height: 64,
          justifyContent: "center",
          display: "flex",
          display: "flex",
          zIndex: 5,
        }}
      >
        <Stack direction="row" justifyContent="space-between" padding={3}>
          <Stack direction="row" display="flex" alignItems="center">
            <ArrowBackIcon
              style={{ padding: 3 }}
              onClick={() => navigate("/")}
              style={{cursor:"pointer"}}
            ></ArrowBackIcon>
            <Typography variant="h4" fontWeight="semi-bold" style={{cursor:"pointer"}} onClick={() => navigate("/")}>
              Quickify
            </Typography>
          </Stack>
          <Stack direction="row" display="flex" alignItems="center">
            {/* // opens and closes the cart */}
            <ShoppingCartIcon
              onClick={() => {
                setCartState(!cartState);
                setPlaylistDropState(false);
              }}
              style={{ paddingRight: 10, cursor:"pointer" }}
              
            />
            <Avatar src={pictureUrl} sx={{ width: 40, height: 40 }}></Avatar>
          </Stack>
        </Stack>
      </AppBar>

      {/* if the cart is open render it */}
      {cartState && (
        <div style={container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "20px",
              alignItems: "center",
              paddingBottom: "10px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center",cursor: "pointer"}}
              onClick={() => {
                setPlaylistDropState(!playlistDropState);
              }}
            >
              <Typography variant="h6" fontWeight="semi-bold">
                Add to playlist
              </Typography>
              {playlistDropState ? (
                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
              ) : (
                <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
              )}
            </div>
            <CloseIcon
              style={{ color: "black", cursor:"pointer" }}
              onClick={() => {
                setCartState(false);
                setPlaylistDropState(false);
              }}
            />
          </div>
          {/* // if the playlists to export to is open, render it  */}
          {playlistDropState && (
            <div style={playlistsContainer}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  color: "white",

                }}
                onClick={() => {
                  createPlaylist().then((playlist) => {
                    exportHandler(playlist.body.id);
                  });
                  setCartState(false);
                  setPlaylistDropState(false);
                }}
              >
                <Typography variant="p1" fontWeight="semi-bold">
                    New Playlist
                </Typography>
                <AddIcon style={{ color: "white" }}></AddIcon>
              </div>
              {/* renders all owned playlists */}
              <Scrollbar
                wrapperProps={{ style: { height: "230px" } }}
                trackYProps={{ style: { height: "210px" } }}
                thumbYProps={{ style: { background: purple[100] } }}
              >
                {ownedPlaylists.map((playlist, index) => {
                  return (
                    <div
                    key={index}
                    
                      style={{
                        cursor: "pointer",
                        variant: "p1",
                        fontWeight: "semi-bold",
                        color: purple[100],
                      }}
                      onClick={() => {
                        exportHandler(playlist.id);
                        setCartState(false);
                        setPlaylistDropState(false);
                      }}
                    >
                      {playlist.name}
                    </div>
                  );
                })}
              </Scrollbar>
            </div>
          )}
          <Scrollbar
            permanentTrackY={true}
            thumbYProps={{ style: { background: purple[700] } }}
            noScrollX={true}
            trackYProps={{
              style: {
                width: "8px",
                top: "0px",
                marginLeft: "50px",
                height: "760px",
              },
            }}
            wrapperProps={{ style: { maxHeight: "770px" } }}
          >
            {/*renders all songs in cart */}
            {cart.map((song, index) => (
              <div key={index} style={{ marginBottom: "8px" }}>
                <SongDisplayLight
                  img={song.img}
                  songName={song.songName}
                  artistName={song.artistName}
                  id={song.id}
                  icon={"close"}
                  buttonHandler={deleteHandler}
                />
              </div>
            ))}
          </Scrollbar>
        </div>
      )}
    </div>
  );
};

export default ShoppingHeader;
