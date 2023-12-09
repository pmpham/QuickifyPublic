import React from "react";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
//img: image of song album art
//name: song name
//Jocelyn
const HorizAlbum48 = ({ img, name }) => {
  return (
    <Box sx={{ width: 140, height: 48 }} elevation={false}>
      <Stack direction="row" alignItems="center" width={140}>
        <CardMedia
          sx={{ width: 48, height: 48, borderRadius: 1 }}
          image={img}
        />
        <Stack direction="row" paddingLeft={1.5}>
          <Typography variant="body2" fontWeight={600}>
            {nameLengthCheck(name)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
// Checks the length of the name and shortens it to fit on the thingy
const nameLengthCheck = (name) => {
  if (name.length > 6) {
    name = name.substring(0, 6) + "...";
  }
  return name;
};

export default HorizAlbum48;
