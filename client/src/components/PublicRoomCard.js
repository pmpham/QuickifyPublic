import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { purple, pink } from "../styles/colors";

const PublicRoomCard = ({ img, name, genre, handleClick }) => {
  return (
    <Box
      sx={{
        width: "980px",
        height: 68,
        backgroundColor: purple[50],
        borderRadius: "8px",
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 2,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Typography variant="h6">{name}</Typography>
          <Typography>Genre: {genre}</Typography>
        </Stack>
        <Button
          onClick={handleClick}
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: pink[500],
            "&:hover": {
              backgroundColor: pink[300],
              color: "white",
            },
          }}
        >
          JOIN
        </Button>
      </Stack>
    </Box>
  );
};

export default PublicRoomCard;
