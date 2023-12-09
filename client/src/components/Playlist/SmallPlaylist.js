import React from "react";
import { Box, Stack, Typography } from "@mui/material";

// SmallPlaylist is component is used for displaying user's playlists in the shopping page.

// name: name of the playlist
// img: image of the playlist
// size: size of the playlist's album
// bold: bold the playlist's name

const SmallPlaylist = ({ name, img, size, desc, bold }) => {
  // if the size of the playist is not 60 or 180, this would show on the screen
  if (size !== 60 && size !== 100) {
    return <Typography>Size should be 60 or 10</Typography>;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        component="img"
        alt="playlist image"
        src={img}
        sx={{
          height: size,
          width: size,
          borderRadius: 1,
        }}
      ></Box>
      <Stack style={{maxHeight:size-13}}>
        <Typography style={{ fontWeight: bold ? 600 : "normal" , overflow:"hidden"}}>
          {name}
        </Typography>
        <Typography>{desc}</Typography>
      </Stack>
    </Stack>
  );
};

export default SmallPlaylist;
