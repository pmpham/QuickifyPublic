import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { purple } from "../../styles/colors";

const MessageBox = ({ message, pictureUrl, isSender }) => {
  const messageContainer = {
    backgroundColor: isSender ? purple[300] : purple[400],
    color: "white",
    borderRadius: "8px",
    padding: "8px",
    maxWidth: "70%",
    wordWrap: "break-word",
    bottom: 0,
  };

  const stackContainer = {
    display: "flex",
    justifyContent: isSender ? "flex-end" : "flex-start",
  };

  return (
    <div style={stackContainer}>
      <Stack direction="row" spacing={1} alignItems="center">
        {isSender && (
          <div style={messageContainer}>
            <Typography variant="body1">{message}</Typography>
          </div>
        )}
        <Avatar alt="picture url" src={pictureUrl} />
        {!isSender && (
          <div style={messageContainer}>
            <Typography variant="body1">{message}</Typography>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default MessageBox;
