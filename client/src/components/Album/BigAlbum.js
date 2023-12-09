import React from "react";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
//img: image of song album art
//imgSize: image size for the two bigger albums
//songName: Song Title
//artistName: Song artists name
//albumName: Name of the album
//typoColor: default is black, sample play needs white
// Jocelyn 
const BigAlbum = ({ 
  img = "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2" ,
   imgSize, songName = "No Song", artistName = "No Artist", albumName = "No Album" , typoColor = "black"}) => {
  if (imgSize !== 456 && imgSize !== 360) {
    return (
      <Typography>imgSize for bigger album should be 456 or 360</Typography>
    );
  }
  return (
    <Box sx={{ width: imgSize, height: imgSize + 153 }}>
      <Stack direction="column" alignItems="center" spacing={1.5}>
        <CardMedia
          sx={{ width: imgSize, height: imgSize }}
          image={img}
          style={{ borderRadius: 20 }}
        />
        <Typography variant="h2" align="center" paddingTop={1} color={typoColor}>
          {songLengthCheck(songName)}
        </Typography>
        <Typography variant="h4" align="center" color={typoColor}>
          {artistLengthCheck(artistName)}
        </Typography>
        <Typography variant="h5" align="center" color={typoColor}>
          {albumLengthCheck(albumName)}
        </Typography>
      </Stack>
    </Box>
  );
};
// Checks the length of the name and shortens it to fit on the component
const songLengthCheck = (name) => {
  if (name.length > 18) {
    name = name.substring(0, 18) + "...";
  }
  return name;
};
const artistLengthCheck = (name) => {
  if (name.length > 25) {
    name = name.substring(0, 25) + "...";
  }
  return name;
};
const albumLengthCheck = (name) => {
  if (name.length > 26) {
    name = name.substring(0, 26) + "...";
  }
  return name;
};

export default BigAlbum;
