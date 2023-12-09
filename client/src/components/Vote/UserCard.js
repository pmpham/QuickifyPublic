import * as React from "react";
import Box from "@mui/material/Box";
import { purple } from "../../styles/colors";
import { Avatar, Typography, Button } from "@mui/material";

// UserCard is used to list out the users that are in the music room.

//img: user's Spotify profile picture
//name: username
//Daniel Gonzalez
const UserCard = ({ img, name }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: 52,
        width: 672,
        backgroundColor: purple[800],
        padding: 1,
        borderRadius: 3,
      }}
    >
      <Box display="flex" alignItems="center">
        <Avatar src={img} alt="Avatar" />
        <Box marginLeft={1}>
          <Typography variant="body1" color="white">
            {name}
          </Typography>
        </Box>
      </Box>
      <Button variant="text" sx={{ color: purple[50] }}>
        Vote to kick
      </Button>
    </Box>
  );
};

export default UserCard;
