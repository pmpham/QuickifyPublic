import React from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { purple, neutral } from "../../styles/colors";

const PurpleInput = ({ text, height, width, searchHandler, value }) => {
  return (
    <>
      <TextField
        type="text"
        variant="outlined"
        placeholder={text}
        value={value}
        onChange={(e) => searchHandler(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton position="end">
              <SearchIcon />
            </IconButton>
          ),
          style: {
            width: width,
            height: height,
            backgroundColor: purple[100],
            color: neutral[600],
          },
        }}
      />
    </>
  );
};

export default PurpleInput;
