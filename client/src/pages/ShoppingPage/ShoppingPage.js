import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import ShoppingButtons from "./ShoppingButtons";
import ShoppingHeader from "../../components/Header/ShoppingHeader";
import HistoryBox from "./HistoryBox";
import { Box } from "@mui/material";
import YourPlaylists from "./subpages/YourPlaylists";
import SavedTracks from "./subpages/SavedTracks";
import SpotifyPlaylists from "./subpages/SpotifyPlaylists";
import TopTracks from "./subpages/TopTracks";
import SavedAlbums from "./subpages/SavedAlbums";
import Genres from "./subpages/Genres";
import TopArtists from "./subpages/TopArtists";
import FollowedArtists from "./subpages/FollowedArtists";
import NewReleases from "./subpages/NewReleases";
import { purple } from "../../styles/colors";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
    getFirestore, deleteDoc,
    collection,
    doc,
    query,
    orderBy, setDoc
} from "firebase/firestore";

const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

const ShoppingPage = ({ accessToken }) => {
  const [userID, setUserID] = useState([]);
  const [pictureUrl, setPictureUrl] = useState();
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("Your Playlists");
  const [playlists, setPlaylists] = useState([]);
  const [userSpotifyId, setUserSpotifyId] = useState(null);

  const [savedTracks, setSavedTracks] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [clickedSong, setClickedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackUri, setCurrentTrackUri] = useState(null);

  const handleComponentSelect = (componentName) => {
    setSelectedComponent(componentName);
  };
    //loads api token into the spotify api wrapper
    useEffect(() => {
      if (!accessToken) return;
      spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);
//popup stuff for sample play done by Jocelyn
  const openPopup = async (clickedSongData) => {
    setClickedSong(clickedSongData);
    setIsPopupOpen(true);
    const playResponse = await spotifyApi
      .play({ uris: [clickedSongData.uri] })
      .catch((err)=>{console.log(err)});
    setIsPlaying(true);
    setCurrentTrackUri(clickedSongData.uri);
  };

  const closePopup = async () => {
    setIsPopupOpen(false);
        spotifyApi.pause()
        .catch((err)=> console.log(err));
        setIsPlaying(false);
  };

  const popup = {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  };

  const container = {
    overflow: "auto",
    background: purple[50],
    padding: "24px 10px 24px 24px",
    display: "flex",
    marginTop: "20px",
    width: "990px",
    borderRadius: "8px",
  };

  const firestore = getFirestore();

  const searchQuery = query(
    collection(firestore, userID + "_cart"),
    orderBy("createdAt")
  );

  const [fsCart, loading, error, snapshot] = useCollectionData(searchQuery);

  //handler to add songs to cart and db  
  // peter
  async function addSongHandler(img, songName, artistName, id, uri) {
    await setDoc(doc(collection(firestore, userID + "_cart"), id), {
      img: img,
      songName: songName,
      artistName: artistName,
      id: id,
      createdAt: Date.now(),
      uri: uri,
    });
  }

  function unique(obj) {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
      var keys = Object.keys(obj[i]);
      keys.sort(function (a, b) {
        return a - b;
      });
      var str = "";
      for (var j = 0; j < keys.length; j++) {
        str += JSON.stringify(keys[j]);
        str += JSON.stringify(obj[i][keys[j]]);
      }
      if (!stringify.hasOwnProperty(str)) {
        uniques.push(obj[i]);
        stringify[str] = true;
      }
    }
    return uniques;
  }

  //peter
  function addToHistoryHandler(img, name, id, uri, type) {
    let tempHistory = history;
    tempHistory.unshift({ img: img, name: name, id: id, uri: uri, type: type });
    tempHistory = unique(tempHistory).slice(0, 6);
    setHistory(tempHistory);
  }

  //handler to clear the cart after exporting  
  //peter
  async function deleteCollection() {
    cart.forEach((song) =>
      deleteHandler(song.img, song.songName, song.artistName, song.id)
    );
  }

  //handler to export songs to playlist  
  //peter
  async function exportSongs(playlistId) {
    if (cart.length == 0) {
      return;
    }
    var temp = [];
    for (let x of cart) {
      temp.push(x.uri);
    }
    await spotifyApi.addTracksToPlaylist(playlistId, temp).then((data) => {
      deleteCollection();
    });
  }

  //handler to create a new playlist  
  //peter
  async function createNewPlaylist() {
    var temp = spotifyApi.createPlaylist("Quickify " + Date.now());
    return temp;
  }

  useEffect(() => {
    if (!fsCart) return;
    setCart(fsCart);
  }, [fsCart]);

  // gets the access token from the Spotify API endpoint
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // gets featured playlists
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getFeaturedPlaylists()
      .then((data) => {
        // console.log(data.body.playlists.items);
        setSpotifyPlaylists(data.body.playlists.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  // gets new releases
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getNewReleases({ limit: 50 })
      .then((data) => {
        setNewReleases(data.body.albums.items);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

  // gets genres
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getAvailableGenreSeeds()
      .then((data) => {
        setGenres(data.body.genres);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

  // gets the user's followed artists
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getFollowedArtists()
      .then((data) => {
        setFollowedArtists(data.body.artists.items);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

  // gets the user's top tracks
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getMyTopTracks({ limit: 50 })
      .then((data) => {
        setTopTracks(data.body.items);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

  // gets the user's saved albums
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getMySavedAlbums()
      .then((data) => {
        setSavedAlbums(data.body.items);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

  // gets the user's profile picture
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMe()
      .then((data) => {
        setPictureUrl(data.body?.images[0]?.url);
        setUserID(data.body?.id);
      })
      .catch((data) => {
        setPictureUrl("");
      });
  }, [accessToken]);

  async function deleteHandler(img, songName, artistName, id, albumName) {
    await deleteDoc(doc(firestore, userID + "_cart", id));
  }

  // gets the user's saved tracks
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMySavedTracks({ limit: 50, offset: 1 })
      .then((data) => {
        setSavedTracks(data.body.items);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [accessToken]);

  // gets the user's followed playlists and their own created playlists
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getUserPlaylists({ limit: 50 })
      .then((data) => {
        setPlaylists(data.body.items);
      })
      .catch((err) => console.log(err));
  }, [accessToken]);

  // gets the user's Spotify ID
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMe().then((data) => setUserSpotifyId(data.body.id));
  }, [accessToken]);

  return (
    <>
      <ShoppingHeader
        pictureUrl={pictureUrl}
        cart={cart}
        deleteHandler={deleteHandler}
        ownedPlaylists={playlists.filter(
          (playlist) => playlist.owner.id === userSpotifyId
        )}
        exportHandler={exportSongs}
        createPlaylist={createNewPlaylist}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <ShoppingButtons onComponentSelect={handleComponentSelect} />
          <div style={{ marginLeft: "38px" }}>
            <Box
              sx={{
                height: "186px",
                width: "360px",
              }}
            ></Box>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <div style={container}>
            {selectedComponent === "Your Playlists" && (
              <YourPlaylists
                title={selectedComponent}
                playlists={playlists}
                userSpotifyId={userSpotifyId}
                accessToken={accessToken}
                addToHistoryHandler={addToHistoryHandler}
                addSongHandler={addSongHandler}
                openPopup={openPopup}
                closePopup={closePopup}
                popup={popup}
                isPopupOpen={isPopupOpen}
                clickedSong={clickedSong}
              />
            )}
            {selectedComponent === "Your Saved Tracks" && (
              <SavedTracks
              accessToken={accessToken}
                title={selectedComponent}
                savedTracks={savedTracks}
                addSongHandler={addSongHandler}
                addToHistoryHandler={addToHistoryHandler}
                openPopup={openPopup}
                closePopup={closePopup}
                popup={popup}
                isPopupOpen={isPopupOpen}
                clickedSong={clickedSong}
              />
            )}
            {selectedComponent === "Spotify Playlists" && (
              <SpotifyPlaylists
                title={selectedComponent}
                spotifyPlaylists={spotifyPlaylists}
                accessToken={accessToken}
                addToHistoryHandler={addToHistoryHandler}
                addSongHandler={addSongHandler}
                openPopup={openPopup}
                closePopup={closePopup}
                popup={popup}
                isPopupOpen={isPopupOpen}
                clickedSong={clickedSong}
              />
            )}
            {selectedComponent === "Your Top Tracks" && (
              <TopTracks
                title={selectedComponent}
                topTracks={topTracks}
                addSongHandler={addSongHandler}
                addToHistoryHandler={addToHistoryHandler}
                openPopup={openPopup}
                closePopup={closePopup}
                popup={popup}
                isPopupOpen={isPopupOpen}
                clickedSong={clickedSong}
                accessToken={accessToken}
              />
            )}
            {selectedComponent === "Your Saved Albums" && (
              <SavedAlbums
                accessToken={accessToken}
                title={selectedComponent}
                savedAlbums={savedAlbums}
                addToHistoryHandler={addToHistoryHandler}
              />
            )}
            {selectedComponent === "Genres" && (
              <Genres title={selectedComponent} genres={genres} />
            )}
            {selectedComponent === "Your Top Artists" && (
              <TopArtists 
              accessToken={accessToken} 
              title={selectedComponent}
              openPopup={openPopup}
              closePopup={closePopup}
              popup={popup}
              isPopupOpen={isPopupOpen}
              clickedSong={clickedSong}
              addToHistoryHandler={addToHistoryHandler}
              addSongHandler={addSongHandler}
               />
            )}
            {selectedComponent === "Your Followed Artists" && (
              <FollowedArtists
                title={selectedComponent}
                followedArtists={followedArtists}
                accessToken={accessToken}
                openPopup={openPopup}
                closePopup={closePopup}
                popup={popup}
                isPopupOpen={isPopupOpen}
                clickedSong={clickedSong}
                addToHistoryHandler={addToHistoryHandler}
                addSongHandler={addSongHandler}
              />
            )}
            {selectedComponent === "New Releases" && (
              <NewReleases
                title={selectedComponent}
                newReleases={newReleases}
                addSongHandler={addSongHandler}
                addToHistoryHandler={addToHistoryHandler}
                openPopup={openPopup}
                closePopup={closePopup}
                popup={popup}
                isPopupOpen={isPopupOpen}
                clickedSong={clickedSong}
                accessToken={accessToken}
              />
            )}
          </div>
          <div style={{ marginLeft: "38px" }}>
            <HistoryBox history={history} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingPage;
