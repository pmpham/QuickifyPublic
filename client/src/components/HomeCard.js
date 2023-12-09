import React from "react";
import { purple, pink } from "../styles/colors";
import { Typography } from "@mui/material";

const HomeCard = ({ text, img, handle }) => {
  const container = {
    display: "flex",
    padding: "24px 24px 22px 24px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: purple[50],
    borderRadius: "8px",
    cursor: "pointer",
  };

  const contentLayout = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  };

  const pinkContainer = {
    display: "flex",
    width: "160px",
    height: "160px",
    padding: "36px 42px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pink[400],
    borderRadius: "8px",
  };

  return (
    <div style={container} onClick={handle}>
      <div style={contentLayout}>
        <div style={pinkContainer}>
          <img src={img} alt="Your Image" />
        </div>

        <Typography
          variant="subtitle1"
          sx={{ color: pink[500], fontWeight: "bold" }}
        >
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default HomeCard;
