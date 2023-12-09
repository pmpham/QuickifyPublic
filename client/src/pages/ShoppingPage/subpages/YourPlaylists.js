import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import PurpleInput from "../../../components/Input/PurpleInput";
import "../../../styles/Tabs.css";
import BigPlaylist from "../../../components/Playlist/BigPlaylist";
import PlaylistSongs from "./PlaylistSongs";
import { purple } from "../../../styles/colors";
import { Scrollbar } from "react-scrollbars-custom";
import SmallPlaylist from "../../../components/Playlist/SmallPlaylist";

//Daniel Gonzalez: State that shows the users saved playlists
const YourPlaylists = ({
  accessToken,
  title,
  playlists,
  userSpotifyId,
  addToHistoryHandler,
  addSongHandler,
  openPopup,
  closePopup,
  popup,
  isPopupOpen,
  clickedSong,
}) => {
  //useStates that are used to pass data for use in different states
  const [activeTab, setActiveTab] = useState(0);
  const [activeContent, setActiveContent] = useState(false);
  const [playlistId, setPlaylistId] = useState();
  const [artistId, setArtistId] = useState();
  const [playlistURI, setPlaylistURI] = useState("");
  const [playlistImg, setPlaylistImg] = useState("https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2");

  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  // logic to search for users existing playlists
  useEffect(()=>{
    if (!search) return setSearchRes([])

    setSearchRes(playlists.filter((playlist)=> playlist.name.toLowerCase().startsWith(search.toLowerCase())))

}, [search])

  // css for container
  const container = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    height: "430px",
  };

  // css for gridItem
  const gridItem = {
    display: "flex",
    gap: "8px",
  };

  // Set active tab as 'active' when clicked
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Set active content based off of user click
  const handlePlaylistClick = () => {
    setActiveContent(true);
  };

  return(
    <div>
      {/** Daniel Gonzalez: Uses active content to display either playlist or the songs within them */}
      {activeContent ? (
          <PlaylistSongs
            accessToken={accessToken}
            playlistId={playlistId}
            title={"Playlist Name"}
            setArtistId={setArtistId}
            addToHistoryHandler={addToHistoryHandler}
            addSongHandler={addSongHandler}
            openPopup={openPopup}
            closePopup={closePopup}
            popup={popup}
            isPopupOpen={isPopupOpen}
            clickedSong={clickedSong}
            setPlaylistURI={setPlaylistURI}
            setPlaylistImg={setPlaylistImg}
            playlistImg={playlistImg}
          />
      ):(
        <div>
         <div
            style={{
              display: "inline-flex",
              gap: "500px",
              height: "10px",
              maxHeight: "40px",
            }}
            >
            {/* Daniel Gonzalez: Header for Your Playlists */}
            <Typography variant="h4">{title}</Typography>
            <div style={{zIndex:1000}}>
              <PurpleInput text={"Search for your playlist"} height={40} width={286} searchHandler={setSearch} value={search}></PurpleInput>
                {search &&
                  <Scrollbar style={{backgroundColor:purple[300], height: 520, borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px"}} contentProps={{style:{padding:"10px"}}}/* wrapperProps={{style:{height:"520px", backgroundColor:purple[300]}}} contentProps={{style:{padding:"10px", backgroundColor:purple[300]}}} scrollerProps={{style:{backgroundColor:purple[300]}}} */>
                      {searchRes.map((playlist)=>{
                        return(<div style={{height:"70px"}}>
                        <SmallPlaylist name={playlist.name} img={playlist.images[0].url} size={60} />
                        </div>)
                      })}
                    </Scrollbar>
                  }
            </div>
          </div>
          
          {/* Tabs */}
           <ul className="tabs">
             <li
              className={activeTab === 0 ? "active" : "inactive"}
              onClick={() => handleTabClick(0)}
            >
              <Typography variant="h6">All</Typography>
            </li>
            <li
              className={activeTab === 1 ? "active" : "inactive"}
              onClick={() => handleTabClick(1)}
            >
              <Typography variant="h6">Playlists You Own</Typography>
            </li>
            <li
              className={activeTab === 2 ? "active" : "inactive"}
              onClick={() => handleTabClick(2)}
            >
              <Typography variant="h6">Playlists You Follow</Typography>
            </li>
          </ul>
          
          {/**Tab Content */}
          <div className="tab-content" onClick={handlePlaylistClick}>
          {/* All */}
          {activeTab === 0 && (
            <div style={container}>
              <Scrollbar
                permanentTrackY={true}
                contentProps={{ style: container }}
                thumbYProps={{ style: { background: purple[200] } }}
                trackYProps={{
                  style: {
                    width: "8px",
                    height: "400px",
                    top: "0px",
                    marginLeft: "5px",
                  },
                }}
              >
                {playlists.map((playlist, index) => {
                  return (
                    <div key={index} style={gridItem}>
                      <BigPlaylist
                        name={playlist.name}
                        img={playlist.images[0]?.url}
                        id={playlist.id}
                        setPlaylistId={setPlaylistId}
                        addToHistoryHandler={addToHistoryHandler}
                        openPopup={openPopup}
                        setActiveContent={setActiveContent}
                      />
                    </div>
                  );
                })}
              </Scrollbar>
            </div>
          )}

          {/* Playlists You Own */}
          {activeTab === 1 && (
            <div style={container}>
              <Scrollbar
                permanentTrackY={true}
                contentProps={{ style: container }}
                thumbYProps={{ style: { background: purple[200] } }}
                trackYProps={{
                  style: {
                    width: "8px",
                    height: "400px",
                    top: "0px",
                    marginLeft: "5px",
                  },
                }}
              >
                {playlists
                  .filter((playlist) => playlist.owner.id === userSpotifyId)
                  .map((playlist, index) => {
                    return (
                      <div key={index} style={gridItem}>
                        <BigPlaylist
                          name={playlist.name}
                          img={playlist.images[0]?.url}
                          id={playlist.id}
                          setPlaylistId={setPlaylistId}
                          addToHistoryHandler={addToHistoryHandler}
                          openPopup={openPopup}
                          setActiveContent={setActiveContent}
                        />
                      </div>
                    );
                  })}
              </Scrollbar>
            </div>
          )}

          {/* Playlists You Follow */}
          {activeTab === 2 && (
            <div style={container}>
              <Scrollbar
                permanentTrackY={true}
                contentProps={{ style: container }}
                thumbYProps={{ style: { background: purple[200] } }}
                trackYProps={{
                  style: {
                    width: "8px",
                    height: "400px",
                    top: "0px",
                    marginLeft: "5px",
                  },
                }}
              >
                {playlists
                  .filter((playlist) => playlist.owner.id !== userSpotifyId)
                  .map((playlist, index) => {
                    return (
                      <div key={index} style={gridItem}>
                        <BigPlaylist
                          name={playlist.name}
                          img={playlist.images[0]?.url}
                          id={playlist.id}
                          setPlaylistId={setPlaylistId}
                          addToHistoryHandler={addToHistoryHandler}
                          setActiveContent={setActiveContent}
                        />
                      </div>
                    );
                  })}
              </Scrollbar>
            </div>
          )}
        </div>  
        </div>
      )}
    </div>
  );
};

export default YourPlaylists;
