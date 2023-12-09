import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { Typography } from "@mui/material";
import VerticalAlbum86 from "../../../components/Album/VerticalAlbum86";
import BigAlbum from "../../../components/Album/BigAlbum";
import { purple } from "../../../styles/colors";
import { Scrollbar } from "react-scrollbars-custom";
import ArtistPage from "./ArtistPage";
import { useState, useEffect } from "react";

// Lydia Yang
// Displays the user's top tracks
const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

const TopTracks = ({
  accessToken,
  title,
  topTracks,
  addSongHandler,
  addToHistoryHandler,
  openPopup,
  closePopup,
  popup,
  isPopupOpen,
  clickedSong,
}) => {
  const [activeContent, setActiveContent] = useState(false);
  const [artistId, setArtistId] = useState();

  const [artistName, setArtistName] = useState([]);
  const [artistProfile, setArtistProfile] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  const container = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    height: "430px",
    width: "990px",
    marginTop: "12px",
  };

  const gridItem = {
    display: "flex",
  };

  //gets access token from Spotify API endpoint
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  //grabs artist info
  useEffect(() => {
    if ((!accessToken, !artistId)) return;

    spotifyApi.getArtist(artistId).then((data) => {
      setArtistName(data.body.name);
      setArtistProfile(data.body.images[0]?.url);
    });
  }, [accessToken, artistId]);

  //grabs artists top tracks
  useEffect(() => {
    if ((!accessToken, !artistId)) return;

    spotifyApi.getArtistTopTracks(artistId, "GB").then((data) => {
      setArtistTopTracks(data.body.tracks);
    });
  }, [accessToken, artistId]);

  //grabs artist albums
  useEffect(() => {
    if ((!accessToken, !artistId)) return;

    spotifyApi.getArtistAlbums(artistId).then((data) => {
      setArtistAlbums(data.body.items);
    });
  }, [accessToken, artistId]);

  //grabs related artists
  useEffect(() => {
    if ((!accessToken, !artistId)) return;

    spotifyApi.getArtistRelatedArtists(artistId).then((data) => {
      setRelatedArtists(data.body.artists);
    });
  }, [accessToken, artistId]);

  return (
    <div>
      {/** Daniel Gonzalez: Uses active contnent to switch the state to the artist page */}
      {activeContent ? (
        <ArtistPage
          name={artistName}
          profile={artistProfile}
          topSongs={artistTopTracks}
          albums={artistAlbums}
          relatedArtists={relatedArtists}
          addSongHandler={addSongHandler}
          addToHistoryHandler={addToHistoryHandler}
          openPopup={openPopup}
          setArtistId={setArtistId}
        />
      ) : (
        <div>
          <Typography variant="h4">{title}</Typography>

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
              {topTracks.map((topTrack, index) => {
                return (
                  <div style={gridItem} key={index}>
                    <VerticalAlbum86
                      songName={topTrack.name}
                      artistName={topTrack.artists[0].name}
                      img={topTrack.album.images[0].url}
                      songId={topTrack.id}
                      addSongHandler={addSongHandler}
                      uri={topTrack.uri}
                      addToHistoryHandler={addToHistoryHandler}
                      openPopup={() => openPopup(topTrack)}
                      setActiveContent={setActiveContent}
                      artistId={topTrack.artists[0]?.id}
                      setArtistId={setArtistId}
                    />
                  </div>
                );
              })}
            </Scrollbar>
          </div>
          {/* popup for sample play - Jocelyn */}
          {isPopupOpen && (
            <div style={popup} onClick={closePopup}>
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
      )}
    </div>
  );
};

export default TopTracks;
