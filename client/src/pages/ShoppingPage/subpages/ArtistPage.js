import React, {useState} from "react";
import Artist from "../../../components/Artist";
import { Typography } from "@mui/material";
import VerticalAlbum86 from "../../../components/Album/VerticalAlbum86";
import VerticalAlbum80 from "../../../components/Album/VerticalAlbum80";
import BigAlbum from "../../../components/Album/BigAlbum";

const ArtistPage = ({ 
  name, 
  profile, 
  topSongs, 
  albums, 
  relatedArtists,
  openPopup, 
  closePopup, 
  popup, 
  isPopupOpen, 
  clickedSong,
  addToHistoryHandler,
  addSongHandler
 }) => {
  const [artistId, setArtistId] = useState();
  const [activeContent, setActiveContent] = useState();
  const container = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "20px",
  };

  const gridItem = {
    display: "flex",
    gap: "8px",
  };

  const pageContainer = {
    display: "flex",
  };

  const contentContainer = {
    flex: 0.99,
  };

  const relatedArtistsContainer = {
    marginTop: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
  };

  return (
    <div style={pageContainer}>
      <div style={contentContainer}>
        <Artist name={name} size={80} profile={profile} bold="bold" />

        {/* Top Songs */}
        <div style={{ marginTop: "28px" }}>
          <Typography variant="h6">Top Songs</Typography>

          <div style={container}>
            {topSongs.map((song, index) => {
              return (
                <div style={gridItem} key={index}>
                <VerticalAlbum86
                    img={song.album.images[0].url}
                    songName={song.name}
                    artistName={song.artists[0].name}
                    songId={song.id}
                    addSongHandler={addSongHandler}
                    uri={song.uri}
                    addToHistoryHandler={addToHistoryHandler}
                    openPopup={() => openPopup(song)}
                    setArtistId={setArtistId}
                    setActiveContent={setActiveContent}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Discography */}
        <div style={{ marginTop: "28px" }}>
          <Typography variant="h6">Discography</Typography>

          <div style={container}>
            {albums.map((album, index) => {
              return (
                <div key={index} style={gridItem}>
                  <VerticalAlbum80
                    songName={album.name}
                    img={album.images[0].url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Related Artists */}
      <div>
        <Typography variant="h6">Related Artists</Typography>
        <div style={relatedArtistsContainer}>
          {relatedArtists.map((artist, index) => {
            return (
              <div key={index}>
                <Artist profile={artist.images[0].url} size={60} />
              </div>
            );
          })}
        </div>
      </div>
      {/* Popup for sample play - Jocelyn */}
      {isPopupOpen && (
        <div style={popup} onClick={closePopup} >
          <BigAlbum
            img={clickedSong.album.images[0].url}
            imgSize={360}
            songName={clickedSong.name}
            artistName={clickedSong.artists[0].name}
            albumName={clickedSong.album.name}
            songId={clickedSong.id}
            uri={clickedSong.uri}
            typoColor="white"
          />
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
