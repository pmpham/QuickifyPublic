import React from "react";
import {
    AppBar, Typography, Avatar, Stack
} from "@mui/material";
import { purple } from "../../styles/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import brokenAvatarImg from "../../assets/icons/broken-avatar.svg";
import { useNavigate } from "react-router-dom";

const RoomHeader = ({ pictureUrl }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      style={{
        backgroundColor: purple[500],
        maxWidth: true,
        height: 64,
        justifyContent: "center",
        display: "flex",
        zIndex: 5,
      }}
    >
      <Stack direction="row" justifyContent="space-between" padding={3}>
        <Stack direction="row" display="flex" alignItems="center">
          <ArrowBackIcon
            style={{ padding: 3, cursor:"pointer" }}
            onClick={() => navigate("/")}
          ></ArrowBackIcon>
          <Typography variant="h4" fontWeight="semi-bold" style={{cursor:"pointer"}} onClick={() => navigate("/")}>
            Quickify
          </Typography>
        </Stack>
        <Stack direction="row" display="flex" alignItems="center">
          <Avatar
            src={pictureUrl === "" ? brokenAvatarImg : pictureUrl}
            sx={{ width: 40, height: 40 }}
          ></Avatar>
        </Stack>
      </Stack>
    </AppBar>
  );
};
export default RoomHeader;
