import React from "react";
import { purple } from "../../styles/colors";
import { Typography } from "@mui/material";
import SmallPlaylist from "../../components/Playlist/SmallPlaylist";

const HistoryBox = ({ history }) => {
  const container = {
    width: "321px",
    height: "415px",
    background: purple[50],
    borderRadius: "8px",
    padding: "20px 20px 20px 20px",
    overflow: "hidden",
  };
  return (
    <div style={container}>
      <Typography variant="h5" sx={{ paddingBottom: 2 }}>
        History
      </Typography>
      {history.length === 0 ? (
        <Typography sx={{ fontSize: 14, color: "gray" }}>
          Every time you click on a playlist, artist, or song, it will be
          displayed here for you to go back!
        </Typography>
      ) : (
        <div style={{ content: "space-between" }}>
          {history.map((arr) => (
            <div style={{ padding: "2px" }} key={arr.name}>
              <SmallPlaylist name={arr.name} img={arr.img} size={60} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryBox;
