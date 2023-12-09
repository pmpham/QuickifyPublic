import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import VerticalAlbum86 from "../../../components/Album/VerticalAlbum86";
import BigAlbum from "../../../components/Album/BigAlbum";
import { Scrollbar } from "react-scrollbars-custom";
import { purple } from "../../../styles/colors";
import BigPlaylist from "../../../components/Playlist/BigPlaylist";
import AlbumSongs from "./AlbumSongs";

// Lydia Yang
// Displays a list of new released albums/songs
const NewReleases = ({
  accessToken,
  title,
  newReleases,
  addSongHandler,
  addToHistoryHandler,
}) => {
  const [albumId, setAlbumId] = useState("");
  const [activeContent, setActiveContent] = useState(false);

  //css styling for container
  const container = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    height: "430px",
    width: "990px",
  };

  //css styling for grid items
  const gridItem = {
    display: "flex",
    gap: "8px",
  };

  //prints either spotifys new releases or the songs within the albums
  return (
    <div>
      {activeContent ? (
        <AlbumSongs accessToken={accessToken} albumId={albumId} />
      ) : (
        <div>
          <Typography variant="h4" paddingBottom={"20px"}>
            {title}
          </Typography>

          <div style={container}>
            <Scrollbar
              permanentTrackY={true}
              contentProps={{ style: container }}
              thumbYProps={{ style: { background: purple[200] } }}
              noScrollX={true}
              trackYProps={{
                style: {
                  width: "8px",
                  height: "400px",
                  top: "0px",
                  marginLeft: "5px",
                },
              }}
            >
              {newReleases.map((newRelease, index) => {
                return (
                  <div style={gridItem} key={index}>
                    <BigPlaylist
                      name={newRelease.name}
                      img={newRelease.images[0].url}
                      addToHistoryHandler={addToHistoryHandler}
                      id={newRelease.id}
                      setActiveContent={setActiveContent}
                      setPlaylistId={setAlbumId}
                    />
                  </div>
                );
              })}
            </Scrollbar>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewReleases;
