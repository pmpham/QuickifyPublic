import React from "react";
import { Box, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "../../assets/icons/add-icon.svg";

//img: image of song album art
//songName: Song Title
//artistName: name of songs artist
//Jocelyn
const VerticalAlbum86 = ({
  img,
  songName,
  artistName,
  artistId,
  setArtistId,
  setActiveContent,
  addToHistoryHandler,
  songId,
  uri,
  addSongHandler,
  openPopup,
}) => {
  const handleArtistClick = () => {
    setArtistId(artistId);
    console.log(artistId);
    setActiveContent(true);
  }

  const handleAddClick = () => {
    return 0;
  }

  return (
    <Box sx={{ width: 86, maxHeight: 116 }}>
      <Stack direction="column" alignItems="center">
        <div style={{ position: "relative" }}>
          <CardMedia
            sx={{
              width: 86,
              height: 80,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              position: "relative",
              cursor: "pointer",
            }}
            image={img}
            style={{ borderRadius: 8 }}
            onClick={() => {
              addToHistoryHandler(img, songName, songId,uri, "song");
              openPopup(songId);
            }}
          >
            <IconButton
              onClick={() => {addSongHandler(img, songName, artistName, songId, uri)}}
              sx={{
                padding: 0.5,
                backgroundColor: "transparent",
                position: "absolute",
                "&:hover": { color: "transparent" },
              }}
            >
              <img src={AddIcon} alt="add icon" />
            </IconButton>
          </CardMedia>
        </div>
        <Typography
          paddingTop={0.5}
          variant="caption"
          fontWeight={600}
          align="center"
        >
          {songLengthCheck(songName)}
        </Typography>
        {/* Not sure if this is still working the way its supposed to but the div is messing up the component spacing :( */}
        {/* <div style={{ marginBottom: "5px" }} onClick={handleArtistClick}> */}
          <Typography
            onClick={handleArtistClick}
            variant="caption"
            fontSize={8}
            align="center"
            style={{ cursor: "pointer" }}
          >
            {artistLengthCheck(artistName)}
          </Typography>
        {/* </div> */}
      </Stack>
    </Box>
  );
};
// Checks the length of the name and shortens it to fit on the thingy
const songLengthCheck = (name) => {
  if (name.length > 10) {
    name = name.substring(0, 10) + "...";
  }
  return name;
};
const artistLengthCheck = (name) => {
  if (name.length > 20) {
    name = name.substring(0, 20) + "...";
  }
  return name;
};

export default VerticalAlbum86;