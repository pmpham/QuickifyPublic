import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { Typography } from "@mui/material";
import VerticalAlbum86 from "../../../components/Album/VerticalAlbum86";
import BigAlbum from "../../../components/Album/BigAlbum";
import { Scrollbar } from "react-scrollbars-custom";
import { purple } from "../../../styles/colors";
import PurpleInput from "../../../components/Input/PurpleInput";
import ArtistPage from "./ArtistPage";
import SmallPlaylist from "../../../components/Playlist/SmallPlaylist";


const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

// Daniel Gonzalez: Prints the songs within the users selected playlist
const PlaylistSongs = ({ 
  accessToken, 
  playlistId, 
  openPopup, 
  closePopup, 
  popup, 
  isPopupOpen, 
  clickedSong,
  addToHistoryHandler,
  addSongHandler,
  setPlaylistURI,
  setPlaylistImg,
  playlistImg
}) => {
  const [songs, setSongs] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("...");
  const [artistId, setArtistId] = useState();

  const [activeContent, setActiveContent] = useState(false);
  const [artistName, setArtistName] = useState([]);
  const [artistProfile, setArtistProfile] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  // logic to search for songs
  useEffect(()=>{
    if (!search) return setSearchRes([])

    setSearchRes(songs.filter((song)=> song.track.name.toLowerCase().startsWith(search.toLowerCase())))

}, [search])
  
  const container = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "15px",
    height: "430px",
    marginTop: "20px",
  };

  //gets access token from Spotify API endpoint
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  //grabs the playlist information
  useEffect(() => {
    if ((!accessToken, !playlistId)) return;
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylistTitle(data.body.name);
      setPlaylistDesc(data.body.description);
      setPlaylistImg(
        data.body.images[0]?.url
          ? data.body.images[0].url
          : "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2"
      );
      setPlaylistURI(data.body.uri);
    });
  }, [accessToken, playlistId]);

  //grabs the playlist songs
  useEffect(() => {
    if ((!accessToken, !playlistId)) return;
    spotifyApi.getPlaylistTracks(playlistId).then((data) => {
      setSongs(data.body.items);
    });
  }, [accessToken, playlistId]);

  //grabs artist info
  useEffect(() => {
    if(!accessToken, !artistId) return;
    
    spotifyApi
      .getArtist(artistId)
      .then((data) => {
        setArtistName(data.body.name);
        setArtistProfile(data.body.images[0]?.url);
      })
  }, [accessToken, artistId])

  //grabs artist top tracks
  useEffect(() => {
    if(!accessToken, !artistId) return;
    
    spotifyApi
      .getArtistTopTracks(artistId, "GB")
      .then((data) => {
        setArtistTopTracks(data.body.tracks);
      })
  }, [accessToken, artistId]);

  //grabs artist albums
  useEffect(() => {
    if(!accessToken, !artistId) return;
    
    spotifyApi
      .getArtistAlbums(artistId)
      .then((data) => {
        setArtistAlbums(data.body.items);
      })
  }, [accessToken, artistId]);

  //grabs related artists
  useEffect(() => {
    if(!accessToken, !artistId) return;
    
    spotifyApi
      .getArtistRelatedArtists(artistId)
      .then((data) => {
        setRelatedArtists(data.body.artists);
      })
  }, [accessToken, artistId]);
  
  //restricts the display of the playlist name length
  const playlistLengthCheck = (name) => {
    if (name.length > 50) {
      name = name.substring(0, 50) + "...";
    }
    return name;
  };

  //restricts the length of the description for the playlist that displays
  const descriptionLengthCheck = (name) => {
    if (name.length > 100) {
      name = name.substring(0, 100) + "...";
    }
    return name;
  };

  //function that gets rid of the HTML tag in the playlist description
  const stripHTMLTags = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText;
  }

  const gridItem = {
    display: "flex",
  };

  // Will print either the playlist songs or the artist display based off of the active content boolean
  return(
    <div>
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
            />
      ):(
        <div>
          {/**Playlist content display */}
          <div style={{
            display: "inline-flex",
            gap: "45px",
            height: "10px",
            maxHeight: "40px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px"
          }}>
            <img src={playlistImg} style={{
              width: "100px",
              height: "100px",
              borderRadius: "8px"
            }}/>
            <div>
              {/** Playlist title */}
              <Typography variant="h4" width={500}>
                {playlistLengthCheck(playlistTitle)}
              </Typography>
              <Typography variant="body1" width={500}>
                {descriptionLengthCheck(stripHTMLTags(playlistDesc))}
              </Typography>
            </div>
            {/**Search Bar for existing playlists */}
            <div style={{zIndex:1, marginTop: "auto"}}>
              <PurpleInput text={"Search for a song"} height={40} width={286} searchHandler={setSearch} value={search}></PurpleInput>
                {search &&
                  <Scrollbar style={{backgroundColor:purple[300], height: 520, borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px"}} contentProps={{style:{padding:"10px"}}}/* wrapperProps={{style:{height:"520px", backgroundColor:purple[300]}}} contentProps={{style:{padding:"10px", backgroundColor:purple[300]}}} scrollerProps={{style:{backgroundColor:purple[300]}}} */>
                      {searchRes.map((song)=>{
                        return(<div style={{height:"70px"}}>
                        <SmallPlaylist name={song.track.name} img={song.track.album.images[0]?.url} size={60} />
                        </div>)
                      })}
                    </Scrollbar>
                  }
            </div>
          </div>

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
            {songs.map((song, index) => {
              return (
                <div style={gridItem} key={index}>
                  <VerticalAlbum86
                    img={song.track.album.images[0]?.url}
                    songName={song.track.name}
                    artistName={song.track.artists[0].name}
                    artistId={song.track.artists[0].id}
                    songId={song.track.id}
                    setArtistId={setArtistId}
                    setActiveContent={setActiveContent}
                    openPopup={() => openPopup(song.track)}
                    addToHistoryHandler={addToHistoryHandler}
                    addSongHandler={addSongHandler}
                    uri = {song.track.uri}
                  />
                </div>
              );
            })}
            </Scrollbar>
            {/* Popup for sample play - Jocelyn */}
          </div>
          {isPopupOpen && (
          <div style={popup} onClick={closePopup} >
              {console.log(clickedSong)}
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

export default PlaylistSongs;
