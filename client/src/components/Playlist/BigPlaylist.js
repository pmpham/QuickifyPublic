import { Box } from "@mui/system";
import React from "react";
import { neutral } from "../../styles/colors";
import { Stack, Typography } from "@mui/material";

const BigPlaylist = ({ name, img="https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2", id, setPlaylistId, addToHistoryHandler, setActiveContent }) => {

const textStyle = {
    whiteSpace: "nowrap", // Prevent text from wrapping
    overflow: "hidden", // Hide overflowed text
    textOverflow: "ellipsis", // Show ellipsis for overflowed text
    width: 125,
  };

  const containerStyle = {
    height: 177,
    width: 149,
    backgroundColor: neutral[50],
    borderRadius: 1,
    cursor: "pointer", // Change the cursor to pointer on hover
  };

  return (
    <Box 
    onClick={() => {setPlaylistId(id); addToHistoryHandler(img, name, id, "", "playlist"); setActiveContent(true)}}
    sx={containerStyle}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Box
          component="img"
          alt="playlist image"
          src={img}
          sx={{
            height: 120,
            width: 120,
            margin: 1.5,
            borderRadius: 1,
          }}
        ></Box>
        <Typography sx={textStyle}>{name}</Typography>
      </Stack>
    </Box>
  );

};

export default BigPlaylist;
