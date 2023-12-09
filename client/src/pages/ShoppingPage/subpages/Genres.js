import React from "react";
import { Typography } from "@mui/material";
import PurpleInput from "../../../components/Input/PurpleInput";

// Lydia Yang
// Displays a list of genres
const Genres = ({ title, genres }) => {
  const container = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "15px",
    height: "430px",
    marginTop: "40px",
    paddingRight: "40px",
    overflowY: "auto",
  };

  const gridItem = {
    width: "150px",
    display: "flex",
    gap: "8px",
  };

  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          gap: "600px",
          height: "10px",
          maxHeight: "40px",
        }}
      >
        {/* Header */}
        <Typography variant="h4">{title}</Typography>
        <PurpleInput text={"Search for genre"} height={40} width={286} />
      </div>

      {/* Displays a list of genres */}
      <div style={container}>
        {genres.map((genre, index) => {
          return (
            <div key={index} style={gridItem}>
              <Typography>{genre}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Genres;
