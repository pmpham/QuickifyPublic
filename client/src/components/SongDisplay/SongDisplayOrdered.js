import React from "react";
import { Box, CardMedia, Stack, Typography, Container } from "@mui/material";
import { purple } from "../../styles/colors";
//img: image of song album art
//songName: Song Title
//artistName: Song artists name
//rank: number song is in the song ranking
//displayColor: color of background of display
//numStars: number of stars a song has
//Jocelyn
//Used in queue when songs are added to display whats playing next and in ranking to show song ranking
const SongDisplayOrdered = ({ 
  img, 
  songName, 
  artistName, 
  rank,
  displayColor,
  id,
  icon,
  buttonHandler,
  uri,
  songLength,
  numStars
}) => {
  return (
    <Box
      sx={{
        height: 64,
        width: "100%",
        borderRadius: 2,
        backgroundColor: displayColor,
      }}
    >
      <Stack direction="row" alignItems={"center"} sx={{ paddingTop: "8px" }}>
        <Typography variant="body1" paddingLeft={"20px"} paddingRight={"16px"}>
          {rank + "."}
        </Typography>
        <CardMedia
          image={img}
          style={{ borderRadius: 4, minWidth: "48px", height: "48px" }}
        />
        <Stack direction={"column"} sx={{ paddingLeft: "12px" }} width={"50%"}>
          <Typography variant="body1" fontWeight={"bold"}>
            {songName}
          </Typography>
          <Typography variant="body2">{artistName}</Typography>
        </Stack>
        <Container align="right" padding={0}>
          <Typography variant="subtitle2" fontWeight={"bold"}>
            {numStars}
            {/* 0 stars */}
          </Typography>
        </Container>
      </Stack>
    </Box>
  );
};

export default SongDisplayOrdered;
