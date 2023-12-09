import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";

// The size of the profile images should be one of the following: 60, 80, 120.

// profile: artist's profile image Spotify URL
// name: artist's name
// size: size of the artist's profile image

const Artist = ({ profile, name, size, bold, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar alt={name} src={profile} sx={{ width: size, height: size }} />
        <Typography
          style={{ fontWeight: bold ? "bold" : "normal", fontSize: "24px" }}
        >
          {name}
        </Typography>
      </Stack>
    </div>
  );
};

export default Artist;
