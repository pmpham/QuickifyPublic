import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Artist from "../../../components/Artist";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistPage from "./ArtistPage";

const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

// Lydia Yang
// Displays a list of followed artists
const FollowedArtists = ({
  title,
  followedArtists,
  accessToken,
  openPopup,
  closePopup,
  popup,
  isPopupOpen,
  clickedSong,
  addToHistoryHandler,
  addSongHandler,
}) => {
  const [selectedArtist, setSelectedArtists] = useState(null);
  const [isArtistClicked, setArtistClicked] = useState(false);
  const [topSongs, setTopSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  // gets the access token from the Spotify API endpoint
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // handles the user's click
  const handleArtistClick = (artist) => {
    setSelectedArtists(artist);
    setArtistClicked(true);
  };

  // when the user clicks on an artist, we'll pass in the artist's id to get their top tracks, albums, and related artists
  const getArtistData = (artistId) => {
    // gets the artist's top songs
    spotifyApi
      .getArtistTopTracks(artistId, "US")
      .then((data) => {
        setTopSongs(data.body.tracks);
      })
      .catch((err) => {
        console.log(err);
      });

    // gets artist's albums
    spotifyApi
      .getArtistAlbums(artistId)
      .then((data) => {
        setAlbums(data.body.items);
      })
      .catch((err) => {
        console.log(err);
      });

    //gets related artists
    spotifyApi
      .getArtistRelatedArtists(artistId)
      .then((data) => {
        setRelatedArtists(data.body.artists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const container = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "8px",
    height: "430px",
    marginTop: "20px",
  };

  const gridItem = {
    display: "flex",
    gap: "8px",
  };

  return (
    // When the user clicks on an artist, the ArtistPage would render and display the data
    <div>
      {isArtistClicked ? (
        <ArtistPage
          name={selectedArtist.name}
          profile={selectedArtist.images[0].url}
          topSongs={topSongs}
          albums={albums}
          relatedArtists={relatedArtists}
          openPopup={openPopup}
          closePopup={closePopup}
          popup={popup}
          isPopupOpen={isPopupOpen}
          clickedSong={clickedSong}
          addSongHandler={addSongHandler}
          addToHistoryHandler={addToHistoryHandler}
        />
      ) : (
        // Displays the user's followed artists
        <div>
          <Typography variant="h4">{title}</Typography>

          <div style={container}>
            {followedArtists.map((followedArtist, index) => {
              return (
                <div key={index} style-={gridItem}>
                  <Artist
                    size={120}
                    profile={followedArtist.images[0].url}
                    onClick={() => {
                      getArtistData(followedArtist.id);
                      handleArtistClick(followedArtist);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowedArtists;
