import React from "react";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
//img: image of song album art
//name: playList name
const HorizPlaylist60 = ({ img, name }) => {
  return (
    <Box sx={{ width: 163, height: 60 }} elevation={false}>
      <Stack direction="row" alignItems="center" width={163}>
        <CardMedia
          sx={{ width: 60, height: 60, borderRadius: 1 }}
          image={img}
        />
        <Stack direction="row" paddingLeft={1}>
          <Typography variant="body1">{nameLengthCheck(name)}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
// Checks the length of the name and shortens it to fit on the thingy
const nameLengthCheck = (name) => {
  if (name.length > 9) {
    name = name.substring(0, 9) + "...";
  }
  return name;
};

export default HorizPlaylist60;
