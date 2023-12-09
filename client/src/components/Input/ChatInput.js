import React from "react";
import { TextField, IconButton } from "@mui/material";
import { purple, neutral } from "../../styles/colors";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ChatInput = ({ value, currentMessageHandler }) => {
  return (
    <TextField
      type="text"
      variant="outlined"
      placeholder="Chat"
      value={value}
      onChange={(e) => currentMessageHandler(e.target.value)}
      InputProps={{
        endAdornment: (
          <IconButton position="end">
            <TagFacesIcon />
          </IconButton>
        ),
        style: {
          width: 370,
          height: 48,
          backgroundColor: purple[100],
          color: neutral[600],
        },
      }}
    />
  );
};

export default ChatInput;
