import React from "react";
import { Typography } from "@mui/material";
import { Scrollbar } from "react-scrollbars-custom";
import { purple } from "../../../styles/colors";

const Lyrics = ({ lyricsArray }) => {
  const container = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    height: "100%",
  };

  return (
    <div style={container}>
      <Scrollbar contentProps={{ style: container }}>
        <Typography variant="subtitle1" style={{ color: purple[500] }}>
          {lyricsArray.map((line) => {
            return <div>{line}</div>;
          })}
        </Typography>
      </Scrollbar>
    </div>
  );
};

export default Lyrics;
