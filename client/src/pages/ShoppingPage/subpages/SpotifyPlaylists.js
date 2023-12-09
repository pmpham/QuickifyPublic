import { Typography } from "@mui/material";
import React, { useState } from "react";
import BigPlaylist from "../../../components/Playlist/BigPlaylist";
import { Scrollbar } from "react-scrollbars-custom";
import { purple } from "../../../styles/colors";
import PlaylistSongs from "./PlaylistSongs";

// Daniel Gonzalez: displays the current spotify playlists
const SpotifyPlaylists = ({ 
  accessToken, 
  title, 
  spotifyPlaylists, 
  addToHistoryHandler,
  addSongHandler,
  openPopup, 
  closePopup, 
  popup, 
  isPopupOpen, 
  clickedSong,
 }) => {
  const [activeContent, setActiveContent] = useState(false);
  const [playlistId, setPlaylistId] = useState();
  const [artistId, setArtistId] = useState();
  const [playlistURI, setPlaylistURI] = useState("");
  const [playlistImg, setPlaylistImg] = useState("https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2");

  const handlePlaylistClick = () => {
    setActiveContent(true);
  }

    const container = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px",
        height: "430px",
        width:"990px"
      };

  const gridItem = {
    display: "flex",
    gap: "8px",
  };

  // Uses active content to display the songs within the playlist once clicked
  return (
    <div>
      {activeContent ? (
        <PlaylistSongs 
          accessToken={accessToken} 
          playlistId={playlistId} 
          title={"Playlist Name"} 
          setArtistId={setArtistId}
          addToHistoryHandler={addToHistoryHandler}
          addSongHandler={addSongHandler}
          setPlaylistURI={setPlaylistURI}
          setPlaylistImg={setPlaylistImg}
          playlistImg={playlistImg}
          openPopup={openPopup}
          closePopup={closePopup} 
          popup={popup}
          isPopupOpen={isPopupOpen} 
          clickedSong={clickedSong}
        />
      ):(
        <div>
          <Typography variant="h4" paddingBottom={"20px"}>{title}</Typography>
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
              {spotifyPlaylists.map((playlist, index) => {
                return (
                  <div key={index} style={gridItem} onClick={handlePlaylistClick}>
                    <BigPlaylist name={playlist.name} img={playlist.images[0].url} id={playlist.id} setPlaylistId={setPlaylistId} addToHistoryHandler={addToHistoryHandler} setActiveContent={setActiveContent}/>
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

export default SpotifyPlaylists;
