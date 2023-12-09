import React from "react";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
//img: image of song album art
//songName: Song Title
//Jocelyn
const VerticalAlbum80 = ({ img, songName }) => {
  return (
    <Box sx={{ width: 80, height: 106 }} elevation={"false"}>
      <Stack direction="column" alignItems="center" spacing={1}>
        <CardMedia
          sx={{ width: 80, height: 80 }}
          image={img}
          style={{ borderRadius: 8, cursor: "pointer" }}
        />
        <Typography variant="body1" fontWeight={600} align="center">
          {songLengthCheck(songName)}
        </Typography>
      </Stack>
    </Box>
  );
};
// Checks the length of the name and shortens it to fit on the thingy
const songLengthCheck = (name) => {
  if (name.length > 8) {
    name = name.substring(0, 8) + "...";
  }
  return name;
};

export default VerticalAlbum80;
