import React from "react";
import { Box, CardMedia, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { purple } from "../../styles/colors";
//img: image of song album art
//songName: Song Title
//artistName: Song artists name
//displayWidth: Short or long variation
//icon: add icon, close icon or no icon
//Jocelyn
//Used in queue when songs are added to queue
const SongDisplayLight = ({
  img,
  songName,
  artistName,
  id,
  icon,
  queue,
  buttonHandler,
  searchHandler,
  albumName,
  uri,
  songLength
}) => {
    const handleClick = () => {
        buttonHandler(img, songName, artistName, id, albumName, uri, songLength)
      };
  return (
    <Box
      sx={{
        backgroundColor: purple[100],
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          sx={{ width: 48, height: 48 }}
          image={img}
          style={{ borderRadius: 4, marginRight: 5 }} // Add margin to create space
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Stack>
            <Typography variant="body1" fontWeight="bold">
              {songName}
            </Typography>
            <Typography variant="body2">{artistName}</Typography>
          </Stack>
          <Button onClick={handleClick}>
            {icon === "add" && <AddIcon style={{ color: "black" }} />}
            {icon === "close" && <CloseIcon style={{ color: "black" }} />}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default SongDisplayLight;
