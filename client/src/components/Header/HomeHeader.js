import React from "react";
import {
    AppBar, Typography, Avatar, Stack
} from "@mui/material";
import { purple } from "../../styles/colors";
import brokenAvatarImg from "../../assets/icons/broken-avatar.svg";
import { useNavigate } from "react-router-dom";

const HomeHeader = ({ pictureUrl }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      elevation={0}
      position="sticky"
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
          <div onClick={() => navigate("/")}>
            <Typography variant="h4" fontWeight="semi-bold" style={{cursor:"pointer"}}>
              Quickify
            </Typography>
          </div>
        </Stack>
        <Avatar
          src={pictureUrl === "" ? brokenAvatarImg : pictureUrl}
          sx={{ width: 40, height: 40 }}
        ></Avatar>
      </Stack>
    </AppBar>
  );
};

export default HomeHeader;
