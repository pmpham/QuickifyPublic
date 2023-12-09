import React from "react";
import { pink } from "../../styles/colors";

// Lydia Yang
const ShoppingButtons = ({ onComponentSelect }) => {
  const buttonText = [
    "Your Playlists",
    "Your Top Tracks",
    "Your Top Artists",
    "Your Saved Tracks",
    "Your Saved Albums",
    "Your Followed Artists",
    "Spotify Playlists",
    "Genres",
    "New Releases",
  ];

  const handleButtonClick = (text) => {
    onComponentSelect(text); // Trigger component selection
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "12px 46px", // Set row gap and column gap
    height: "200px",
  };

  const buttonStyle = {
    width: "309px",
    height: "54px",
    backgroundColor: pink[500],
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    padding: "0 16px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    textAlign: "left",
  };

  return (
    // Displays the pink buttons
    <div style={containerStyle}>
      {buttonText.map((text, index) => {
        return (
          <div key={index}>
            <button
              style={buttonStyle}
              onClick={() => handleButtonClick(text)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = pink[500];
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = pink[500];
                e.target.style.color = "white";
              }}
            >
              {text}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingButtons;
