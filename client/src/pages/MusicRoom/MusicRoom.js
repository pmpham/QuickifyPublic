import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import RoomHeader from "../../components/Header/RoomHeader";
import BigAlbum from "../../components/Album/BigAlbum";
import Queue from "./subpages/Queue";
import Lyrics from "./subpages/Lyrics";
import History from "./subpages/History";
import Ranking from "./subpages/Ranking";
import { purple } from "../../styles/colors";
import { Typography } from "@mui/material";
import ChatBox from "../../components/Chat/ChatBox";
import socket from "../../hooks/socket";
import { useLocation } from "react-router-dom";
import { app } from "../../hooks/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  getFirestore,
  doc,
  collection,
  query,
  orderBy,
  deleteDoc,
  setDoc,
  getDocs,
  getDoc
} from "firebase/firestore";
import axios from "axios";
import { pink } from "../../styles/colors"
import SkipSongCard from "../../components/Vote/SkipSongCard";

const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

const MusicRoom = ({ accessToken }) => {
  const [pictureUrl, setPictureUrl] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [songQueue, setQueue] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [currSong, setCurrSong] = useState();
  const [timeoutId, setTimeoutId] = useState();
  const [currSongDocId, setCurrSongDocId] = useState();
  const [currLyrics, setLyrics] = useState(["No lyrics for current song :("]);
  const [vote, setVote] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const userID = socket.id;

  // Gets the URL value of room to get the room number from the user's input
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const room = searchParams.get("room");

  // css for container
  const container = {
    width: "1193px",
    height: "780px",
    background: purple[50],
    borderRadius: "20px",
    padding: "20px 20px 20px 20px",
    overflow: "hidden",
  };

  // css for floatingActionButton
  const floatingActionButton = {
    position: "fixed",
    bottom: "30px",
    right: "40px",
  };

  // connects to database to get live data regarding queue
  // peter pham
  const firestore = getFirestore();
  const searchQuery = query(
    collection(firestore, room + "_queue"),
    orderBy("createdAt"),
  );
  const [songs, loading, error, snapshot] = useCollectionData(searchQuery);
//Jocelyn 
//Song history stuff
  const historyCollection = collection(firestore, room + "_songhistory");
  const [historyData, historyLoading, historyError] =
    useCollectionData(historyCollection);

  //console.log(currLyrics);
  //jocelyn 
//updates the songs ranking in database eachtime the amount of stars changes
  const updateRanking = async (value, id) => {
    const docRef = doc(collection(firestore, room + "_songhistory"), id);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();
        const updatedData = {
          ...existingData,
          stars: value,
        };
        await setDoc(docRef, updatedData);
        console.log("Ranking changed successfully");
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating ranking:", error);
    }
  };
  //jocelyn
//reads the amount of stars a song has
  async function readRank(id) {
         const ranks = await getDocs(
           query(collection(firestore, room + "_songhistory"), orderBy("stars", "desc"))
         );
         const songId = `${id}`;
         let rank = 1;
         for (const doc of ranks.docs) {
           const song = `${doc.get("id")}`;
           if (song === songId) {
             return rank;
           }
           rank++;
         }
       };

  
  // Daniel Gonzalez: closes the voting pop up when selected
  const closeVote = async () => {
    setIsPopupOpen(false);
    setVote(false);
  }

  // css for popup
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
 
  // updates the queue when the db changes, sets current song for sync
  // peter pham
  useEffect(() => {
    if (!songs) {
      setCurrSong();
      setCurrSongDocId();
      setQueue([]);
      setLyrics(["No lyrics for current song :("]);
      return;
    } else if (songs.length == 0) {
      setCurrSong();
      setCurrSongDocId();
      setQueue([]);
      setLyrics(["No lyrics for current song :("]);
    } else if (!currSong) {
      setCurrSong(songs[0]);
      //updates lyrics
      axios
        .post(
          "https://spotify-lyric-api-984e7b4face0.herokuapp.com/?trackid=" +
            songs[0].id,
        )
        .then((res) => {
          let temp = [];
          res.data?.lines.forEach((line) => {
            temp.push(line.words);
          });
          setLyrics(temp);
        })
        .catch((err) => {
          console.log(err);
          setLyrics(["No lyrics for current song :("]);
        });
    } else if (currSong.id != songs[0].id) {
      setCurrSong(songs[0]);
      axios
        .post(
          "https://spotify-lyric-api-984e7b4face0.herokuapp.com/?trackid=" +
            songs[0].id,
        )
        .then((res) => {
          let temp = [];
          res.data?.lines.forEach((line) => {
            temp.push(line.words);
          });
          setLyrics(temp);
        })
        .catch((err) => {
          console.log(err);
          setLyrics(["No lyrics for current song :("]);
        });
    }
    setQueue(songs);
  }, [songs]);

  // when the current song changes, play it and set timeout to play next song
  //peter
  useEffect(() => {
    clearTimeout(timeoutId);
    if (!currSong) return;
    spotifyApi.setRepeat("off").catch((err) => {
      console.log(err);
    });
    spotifyApi.setShuffle(false).catch((err) => {
      console.log(err);
    });
    spotifyApi
      .play({ uris: [currSong.uri] })
      .then(
        setTimeoutId(
          setTimeout(() => {
            console.log("deleting");
            const deletedSong = songs[0];
            deleteDoc(doc(firestore, room + "_queue", snapshot.docs[0].id));
            // Add the deleted song to the history collection
            setDoc(
              doc(collection(firestore, room + "_songhistory"), deletedSong.id),
              {
                albumName: deletedSong.albumName,
                artistName: deletedSong.artistName,
                createdAt: Date.now(),
                id: deletedSong.id,
                img: deletedSong.img,
                songLength: deletedSong.songLength,
                songName: deletedSong.songName,
                uri: deletedSong.uri,
                stars: 0
              },
              {
                merge: true,
              },
            )
              .then(() => {
                console.log("Song added to history");
              })
              .catch((error) => {
                console.error("Error adding song to history: ", error);
              });
          }, currSong.songLength),
        ),
      )
      .catch((err) => {
        console.log(err);
      });
  }, [currSong]);

  // Handles the tabs
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Shows user the Vote to Skip button has been pressed
  const voteToSkipClick = () => {
    setVote(true);
    setIsPopupOpen(true);
  };

  // sends a message when user presses the submit button
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        message: currentMessage,
        author: userID,
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  //loads api token into the spotify api wrapper
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // gets the user's profile picture and (Daniel Gonzalez did the name bit) name
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMe()
      .then((data) => {
        setPictureUrl(data.body.images[0].url);
        setCurrentUser(data.body.display_name);
      })
      .catch((data) => {
        setPictureUrl("");
      });
  }, [accessToken]);

  //gets results after someone types into the search bar
  //peter
  useEffect(() => {
    if (!search) return setSearchRes([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchRes(
        res.body.tracks.items.map((track) => {
          //gets the smallest image
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0],
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            album: track.album.name,
            id: track.id,
            duration_ms: track.duration_ms,
          };
        }),
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  // receiving messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
        console.log(data)
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  // allows bidirectional communication
  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", room);

    return () => {
      socket.disconnect();
    };
  }, [room]);

  return (
    <>
      <RoomHeader pictureUrl={pictureUrl} />
      <div
        style={{
          display: "flex",
          width: "1780px",
          justifyContent: "space-between",
          marginRight: "auto",
          marginLeft: "auto"
        }}
      >
        {/* Song Player */}
        {/* { songName = "No Song", artistName = "No Artist", albumName = "No Album" } */}

        <div
          style={{
            display: "inline"
          }}>
        {/* renders the current song if there is one   */}
        {currSong && (
          <BigAlbum
            img={currSong.img}
            imgSize={360}
            songName={currSong.songName}
            artistName={currSong.artistName}
            albumName={currSong.albumName}
          />
        )}
        {!currSong && <BigAlbum imgSize={360} />}
        
        {/** Daniel Gonzalez: Vote to Skip Button */}
        {vote ? (
          <Typography variant="h6" 
          style={{color: "white",
          display: 'flex',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '70px'
        }}>Waiting for other votes...</Typography>
        ):(
          <button 
          style={{
            display: "flex",
            marginTop: "50px",
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '153px',
            height: '51px',
            borderRadius: '20px',
            backgroundColor: pink[500],
            color: 'white',
            fontWeight: '600',
            fontSize: '18px',
            paddingLeft: '22px',
            paddingTop: '13px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s',
            textAlign: 'center',
          }}
          onClick={() => voteToSkipClick()}
        >
          Vote to Skip
        </button>
        )}
        
        </div>
        
        

        {/* Tabs */}
        <div style={container}>
          <div
            style={{ width: "1120px", marginLeft: "auto", marginRight: "auto" }}
          >
            {/* Tabs */}
            <ul className="tabs">
              <li
                className={activeTab === 0 ? "active" : "inactive"}
                onClick={() => handleTabClick(0)}
                style={{ height: "auto" }}
              >
                <Typography variant="h6">Queue</Typography>
              </li>
              <li
                className={activeTab === 1 ? "active" : "inactive"}
                onClick={() => handleTabClick(1)}
                style={{ height: "auto" }}
              >
                <Typography variant="h6">Lyrics</Typography>
              </li>
              <li
                className={activeTab === 2 ? "active" : "inactive"}
                onClick={() => handleTabClick(2)}
                style={{ height: "auto" }}
              >
                <Typography variant="h6">History</Typography>
              </li>
              <li
                className={activeTab === 3 ? "active" : "inactive"}
                onClick={() => handleTabClick(3)}
                style={{ height: "auto" }}
              >
                <Typography variant="h6">Ranking</Typography>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content" style={{ height: "620px" }}>
              {activeTab === 0 && (
                <Queue
                  searchHandler={setSearch}
                  value={search}
                  searchRes={searchRes}
                  songQueue={songQueue}
                />
              )}
              {activeTab === 1 && <Lyrics lyricsArray={currLyrics} />}
              {activeTab === 2 && (
                <History 
                  historyData={historyData} 
                  updateRanking={updateRanking} 
                />
              )}
              {activeTab === 3 && (
                <Ranking 
                  rankingData={historyData} 
                  readRank={readRank} 
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbox */}
      <div style={floatingActionButton}>
        <ChatBox
          currentMessageHandler={setCurrentMessage}
          value={currentMessage}
          submit={sendMessage}
          messageList={messageList}
          pictureUrl={pictureUrl}
          userID={userID}
        />
      </div>
    
    <div>
    {isPopupOpen && (
      <div style={popup} onClick={() => closeVote()}>
        <SkipSongCard name={currentUser}></SkipSongCard>
      </div>)}
    </div>
    

    </>
  );
};

export default MusicRoom;
