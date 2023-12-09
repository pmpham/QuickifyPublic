import React, { useState, useEffect } from "react";
import Artist from "../../../components/Artist";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistPage from "./ArtistPage";
import { Typography } from "@mui/material";
import { purple } from "../../../styles/colors";
import { Scrollbar } from "react-scrollbars-custom";
//Jocelyn
//Displays users short,medium, and long term top artists
const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

const TopArtists = ({ accessToken, 
  title, 
  openPopup, 
  closePopup, 
  popup, 
  isPopupOpen, 
  clickedSong, 
  addToHistoryHandler,
  addSongHandler
}) => {
  const [topArtistsLong, setTopArtistsLong] = useState([]);
  const [topArtistsMed, setTopArtistsMed] = useState([]);
  const [topArtistsShort, setTopArtistsShort] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

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

  const handleTabClick = (index) => {
    setActiveTab(index);
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
        console.log(data);
        setAlbums(data.body.items);
      })
      .catch((err) => {
        console.log(err);
      });

    //gets related artists
    spotifyApi
      .getArtistRelatedArtists(artistId)
      .then((data) => {
        console.log(data.body.artists);
        setRelatedArtists(data.body.artists);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //gets the users top artists long term
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getMyTopArtists({ time_range: "long_term" })
      .then((data) => {
        setTopArtistsLong(data.body.items);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

  //gets the users top artists medium term
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getMyTopArtists({ time_range: "medium_term" })
      .then((data) => {
        setTopArtistsMed(data.body.items);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

  //gets the users top artists short term
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getMyTopArtists({ time_range: "short_term" })
      .then((data) => {
        setTopArtistsShort(data.body.items);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

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
          addToHistoryHandler={addToHistoryHandler}
          addSongHandler={addSongHandler}
          />
      ) : (
        <div>
          <Typography variant="h4">{title}</Typography>
          {/* </div> */}
          <div>
            {/* Tabs */}
            <ul className="tabs">
              <li
                className={activeTab === 0 ? "active" : "inactive"}
                onClick={() => handleTabClick(0)}
              >
                <Typography variant="h6">Last Month</Typography>
              </li>
              <li
                className={activeTab === 1 ? "active" : "inactive"}
                onClick={() => handleTabClick(1)}
              >
                <Typography variant="h6">Last 6 Months</Typography>
              </li>
              <li
                className={activeTab === 2 ? "active" : "inactive"}
                onClick={() => handleTabClick(2)}
              >
                <Typography variant="h6">All Time</Typography>
              </li>
            </ul>
            {/* Tab Content */}
            <div className="tab-content">
              {/*short-term*/}
              {activeTab === 0 && (
                <div style={container}>
                  <Scrollbar
                    style={{ width: "984px" }}
                    permanentTrackY={true}
                    contentProps={{ style: container }}
                    thumbYProps={{ style: { background: purple[200] } }}
                    trackYProps={{
                      style: { width: "8px", height: "400px", top: "0px" },
                    }}
                  >
                    {topArtistsShort.map((topArtistShort, index) => {
                      return (
                        <div key={index} style={gridItem}>
                          <Artist
                            size={120}
                            profile={topArtistShort.images[0].url}
                            onClick={() => {
                              getArtistData(topArtistShort.id);
                              console.log(topArtistShort.id);

                              handleArtistClick(topArtistShort);
                            }}
                          />
                        </div>
                      );
                    })}
                  </Scrollbar>
                </div>
              )}
              {activeTab === 1 && (
                <div style={container}>
                  <Scrollbar
                    style={{ width: "984px" }}
                    permanentTrackY={true}
                    contentProps={{ style: container }}
                    thumbYProps={{ style: { background: purple[200] } }}
                    trackYProps={{
                      style: { width: "8px", height: "400px", top: "0px" },
                    }}
                  >
                    {topArtistsMed.map((topArtistMed, index) => {
                      return (
                        <div key={index} style={gridItem}>
                          <Artist
                            size={120}
                            profile={topArtistMed.images[0].url}
                            onClick={() => {
                              getArtistData(topArtistMed.id);
                              handleArtistClick(topArtistMed);
                            }}
                          />
                        </div>
                      );
                    })}
                  </Scrollbar>
                </div>
              )}
              {activeTab === 2 && (
                <div style={container}>
                  <Scrollbar
                    style={{ width: "984px" }}
                    permanentTrackY={true}
                    contentProps={{ style: container }}
                    thumbYProps={{ style: { background: purple[200] } }}
                    trackYProps={{
                      style: { width: "8px", height: "400px", top: "0px" },
                    }}
                  >
                    {topArtistsLong.map((topArtistLong, index) => {
                      return (
                        <div key={index} style={gridItem}>
                          <Artist
                            size={120}
                            profile={topArtistLong.images[0].url}
                            onClick={() => {
                              getArtistData(topArtistLong.id);
                              handleArtistClick(topArtistLong);
                            }}
                          />
                        </div>
                      );
                    })}
                  </Scrollbar>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopArtists;
