import React, { useState } from "react";
import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { purple, pink, red } from "../../styles/colors";
import closeIcon from "../../assets/icons/close.svg";
import socket from "../../hooks/socket";
import { app } from "../../hooks/firebase";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  updateDoc,
} from "firebase/firestore";
//Jocelyn - I did most of the UI part of this one
const RoomJoin = ({ errorCode, handleClose, handleJoinRoom, navigate }) => {
  const [room, setRoom] = useState("");
  const [hasError, setHasError] = useState(false);

  const firestore = getFirestore();

  // User joins a music room with their inputted value
  async function handleSubmit() {
    if (room.trim() !== "") {
      handleClose();

      socket.emit("joinRoom", room);
      await updateDoc(doc(collection(firestore, "rooms"), room), {
        code: room,
      }).catch((err) => {
        setDoc(doc(collection(firestore, "rooms"), room), {
          code: room,
          visibility: true,
        });
      });
      navigate(`/music?room=${room}`);
    } else {
      setHasError(true);
    }
  }

  return (
    <Box //main background of component
      sx={{
        width: 700,
        height: 400,
        backgroundColor: purple[400],
        borderRadius: 8,
        display: "flex", // Use flexbox
        flexDirection: "column", // Column layout for children
        alignItems: "center", // Center content horizontally
        justifyContent: "center", // Center content vertically
        position: "relative", // Position relative for absolute icon
      }}
    >
      <img
        src={closeIcon}
        alt="Close"
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          cursor: "pointer",
        }}
      />
      {/* Join a room */}
      <Typography
        align="center"
        variant="h2"
        color={"white"}
        paddingTop={2}
        paddingBottom={7}
      >
        {"Join a Room"}
      </Typography>
      {/* Box for invitation code input */}
      <Container
        align="center"
        sx={{ width: 620, height: 80, backgroundColor: "white" }}
        style={{
          borderRadius: 4,
          border: "2px solid",
          borderColor: purple[200],
        }}
      >
        <Typography
          align="left"
          variant="subtitle2"
          style={{ opacity: 0.7 }}
          paddingTop={1}
          paddingBottom={1}
        >
          <TextField
            variant="standard"
            label="Input invitation code"
            style={{ width: 570 }}
            InputProps={{ disableUnderline: true }}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          {/* variant standard removes outline and input prop removes underline */}
        </Typography>
      </Container>

      {/* Checks value for errorCode - if it is true it will display Room not found */}
      {hasError && (
        <Typography
          align="left"
          variant="body2"
          color={red[200]}
          paddingTop={3}
        >
          {"Room not found"}
        </Typography>
      )}
      {/* If errorCode is false - need to adjust spacing */}
      {errorCode === false && (
        <Typography
          align="left"
          variant="body2"
          color={red[200]}
          paddingLeft={5}
          paddingBottom={6}
        >
          {" "}
        </Typography>
      )}
      {/* Pink Submit button */}
      <Container align="center">
        <Button
          variant="contained"
          sx={{
            marginTop: 4,
            width: 248,
            height: 62,
            backgroundColor: pink[500],
            "&:hover": { backgroundColor: "white", color: pink[500] },
          }}
          style={{ borderRadius: 20 }}
          onClick={handleSubmit}
        >
          <Typography align="center" variant="subtitle2" padding={2}>
            {"Submit"}
          </Typography>
        </Button>
      </Container>
    </Box>
  );
};

export default RoomJoin;
