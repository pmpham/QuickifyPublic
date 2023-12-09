import React, {useState, useEffect} from "react";
import SpotifyWebApi from "spotify-web-api-node/src/spotify-web-api";
import { Typography } from "@mui/material";
import BigPlaylist from "../../../components/Playlist/BigPlaylist";
import AlbumSongs from "./AlbumSongs";

// Displays the users saved albums
const SavedAlbums = ({ accessToken, title, savedAlbums, addToHistoryHandler }) => {
  const [albumId, setAlbumId] = useState('');
  const [activeContent, setActiveContent] = useState(false);

  //csscontainer style
  const container = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "15px",
    height: "430px",
    marginTop: "20px",
  };

  //css for grid items
  const gridItem = {
    display: "flex",
    gap: "8px",
  };

  // prints either album songs or the users saved albums
  return (
    <div>
      {/** Prints the album songs based off of the active content bool */}
      {activeContent ? (
        <AlbumSongs
          accessToken={accessToken}
          albumId={albumId}
        />
      ):(
      <div>
        <Typography variant="h4">{title}</Typography>

        <div style={container}>
          {savedAlbums.map((savedAlbum, index) => {
            return (
              <div key={index} style={gridItem}>
                <BigPlaylist
                  name={savedAlbum.album.name}
                  img={savedAlbum.album.images[0].url}
                  id={savedAlbum.album.id}
                  setPlaylistId={setAlbumId}
                  setActiveContent={setActiveContent}
                  addToHistoryHandler={addToHistoryHandler}
                />
              </div>
            );
          })}
        </div>
      </div>)}
    </div>
  );
};

export default SavedAlbums;
