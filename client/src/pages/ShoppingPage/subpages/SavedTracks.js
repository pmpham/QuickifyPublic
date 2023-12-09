import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import VerticalAlbum86 from "../../../components/Album/VerticalAlbum86";
import { Scrollbar } from "react-scrollbars-custom";
import { purple } from "../../../styles/colors";
import BigAlbum from "../../../components/Album/BigAlbum";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistPage from "./ArtistPage";

const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

// Displays the users saved tracks
const SavedTracks = ({
  accessToken,
  title, 
  savedTracks, 
  addSongHandler, 
  addToHistoryHandler, 
  openPopup, 
  closePopup, 
  popup, 
  isPopupOpen, 
  clickedSong 
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
      width:"990px"
    };

  const gridItem = {
    display: "flex",
  };

  //gets access token from Spotify API endpoint
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Daniel Gonzalez: grabs artist info
  useEffect(() => {
    if(!accessToken, !artistId) return;
    
    spotifyApi
      .getArtist(artistId)
      .then((data) => {
        setArtistName(data.body.name);
        setArtistProfile(data.body.images[0]?.url);
      })
  }, [accessToken, artistId])

  // Daniel Gonzalez: grabs artists top tracks
  useEffect(() => {
    if(!accessToken, !artistId) return;
    
    spotifyApi
      .getArtistTopTracks(artistId, "GB")
      .then((data) => {
        setArtistTopTracks(data.body.tracks);
      })
  }, [accessToken, artistId]);

  // Daniel Gonzalez: grabs artist albums
  useEffect(() => {
    if(!accessToken, !artistId) return;
    
    spotifyApi
      .getArtistAlbums(artistId)
      .then((data) => {
        setArtistAlbums(data.body.items);
      })
  }, [accessToken, artistId]);

  // Daniel Gonzalez: grabs related artists
  useEffect(() => {
    if(!accessToken, !artistId) return;
    
    spotifyApi
      .getArtistRelatedArtists(artistId)
      .then((data) => {
        setRelatedArtists(data.body.artists);
      })
  }, [accessToken, artistId]);

  // Daniel Gonzalez: uses active content to print the artist page or the users saved tracks
  return (
    <div>
      {activeContent ? (
      <ArtistPage 
        name={artistName} 
        profile={artistProfile} 
        topSongs={artistTopTracks} 
        albums={artistAlbums} 
        relatedArtists={relatedArtists}
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
          {savedTracks.map((savedTrack, index) => {
            return (
              <div style={gridItem} key={index}>
                <VerticalAlbum86
                  img={savedTrack.track.album.images[0].url}
                  songName={savedTrack.track.name}
                  artistName={savedTrack.track.artists[0].name}
                  songId={savedTrack.track.id}
                  addSongHandler={addSongHandler}
                  uri={savedTrack.track.uri}
                  addToHistoryHandler={addToHistoryHandler}
                  openPopup={() => openPopup(savedTrack.track)}
                  artistId={savedTrack.track.artists[0]?.id}
                  setActiveContent={setActiveContent}
                  setArtistId={setArtistId}
                  />
              </div>
            );
          })}
          </Scrollbar>
          {/* Popup for sample play - Jocelyn */}
        </div>
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
      )}
    </div>
  );
};

export default SavedTracks;
