import React from "react";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
import { purple } from "../../styles/colors";
//img: image of song album art
//songName: name of song
//artistName: name of songs artist
const HorizPlaylist100 = ({ img, songName, artistName }) => {
  return (
    <Box sx={{ width: 243, height: 100 }} elevation={"false"}>
      <Stack direction="row" alignItems="center" width={243}>
        <CardMedia
          sx={{ width: 100, height: 100, borderRadius: 1 }}
          image={img}
        />
        <Stack direction="column" paddingLeft={1.5} spacing={1}>
          <Typography variant="subtitle2" color={purple[500]}>
            {songNameLengthCheck(songName)}
          </Typography>
          <Typography variant="body1" color={purple[500]}>
            {artistNameLengthCheck(artistName)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
// Checks the length of the name and shortens it to fit on the thingy
const songNameLengthCheck = (name) => {
  if (name.length > 10) {
    name = name.substring(0, 10) + "...";
  }
  return name;
};
const artistNameLengthCheck = (name) => {
  if (name.length > 15) {
    name = name.substring(0, 15) + "...";
  }
  return name;
};

export default HorizPlaylist100;
