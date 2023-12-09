import React from "react";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
//img: image of song album art
//songName: name of song
//artistName: name of songs artist
//Jocelyn
const HorizAlbum60 = ({ img, songName, artistName }) => {
  return (
    <Box sx={{ width: 143, height: 60 }} elevation={false}>
      <Stack direction="row" alignItems="center" width={140}>
        <CardMedia
          sx={{ width: 60, height: 60, borderRadius: 1 }}
          image={img}
        />
        <Stack direction="column" paddingLeft={1.5}>
          <Typography variant="body1" fontWeight={600}>
            {songNameLengthCheck(songName)}
          </Typography>
          <Typography variant="caption">
            {artistNameLengthCheck(artistName)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
// Checks the length of the name and shortens it to fit on the thingy
const songNameLengthCheck = (name) => {
  if (name.length > 6) {
    name = name.substring(0, 6) + "...";
  }
  return name;
};
const artistNameLengthCheck = (name) => {
  if (name.length > 9) {
    name = name.substring(0, 9) + "...";
  }
  return name;
};

export default HorizAlbum60;
