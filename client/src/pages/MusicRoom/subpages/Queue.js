import React, { useEffect } from "react";
import PurpleInput from "../../../components/Input/PurpleInput";
import SongDisplayLight from "../../../components/SongDisplay/SongDisplayLight";
import SongDisplayOrdered from "../../../components/SongDisplay/SongDisplayOrdered";
import { purple } from "../../../styles/colors";
import { Scrollbar } from "react-scrollbars-custom";
import { app } from "../../../hooks/firebase";
import { useLocation } from "react-router-dom";
import {
    getFirestore,
    addDoc, collection
} from "firebase/firestore";

const Queue = ({ searchHandler, value, searchRes, songQueue }) => {
  // Gets the URL value of room to get the room number from the user's input
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const room = searchParams.get("room");

  const firestore = getFirestore();

  const searchResultContainer = {
    width: "1080px",
    height: "580px",
    backgroundColor: purple[400],
    padding: "20px",
    overflow: "auto",
    borderRadius: "0px 0px 20px 20px",
  };

  // updated handler to add song to db queue  
  const addButtonHandler = async (img, songName, artistName, id, albumName, uri, songLength) => {
    await addDoc((collection(firestore, room + "_queue")), {
      img: img,
      songName: songName,
      artistName: artistName,
      id: id,
      albumName: albumName,
      createdAt: Date.now(),
      uri: uri,
      songLength: songLength
    });
    searchHandler("");
  };

  useEffect(()=>{},[songQueue])

  return (
    <div>
      {/* Search engine */}
      <PurpleInput
        width={1120}
        text={"Search for a song to queue"}
        searchHandler={searchHandler}
        value={value}
      />

      {/**Seach Results  */}
      {value && (
        <div style={searchResultContainer}>
          <Scrollbar
            wrapperProps={{ style: { width: "98%" } }}
            thumbYProps={{ style: { background: purple[700] } }}
            trackYProps={{
              style: { width: "8px", marginLeft: "5px" },
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Displays the added song in the queue */}
              {searchRes.map((track, index) => {
                return (
                  <div key={index} style={{ marginBottom: "8px" }}>
                    <SongDisplayLight
                      img={track.albumUrl}
                      songName={track.title}
                      artistName={track.artist}
                      icon={"add"}
                      id={track.id}
                      buttonHandler={addButtonHandler}
                      albumName={track.album}
                      uri={track.uri}
                      songLength={track.duration_ms}
                    />
                  </div>
                );
              })}
            </div>
          </Scrollbar>
        </div>
      )}

      {!value && songQueue.length > 0 && (
        <div
          style={{
            height: "600px",
            overflow: "auto",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: purple[100],
            borderRadius: "10px",
          }}
        >
          {/*Scroll bar*/}
          <Scrollbar
            permanentTrackY={true}
            wrapperProps={{ style: { width: "98%" } }}
            thumbYProps={{ style: { background: purple[200] } }}
            trackYProps={{
              style: {
                width: "8px",
                height: "595px",
                top: "0px",
                marginLeft: "5px",
              },
            }}
          >
            {/*Queue Container*/}
            {songQueue.map((track, index) => {
              return (
                <div key={index} style={{ marginBottom: "8px" }}>
                  <SongDisplayOrdered
                    img={track.img}
                    songName={track.songName}
                    artistName={track.artistName}
                    id={track.id}
                    rank={index + 1}
                    displayColor={purple[50]}
                  />
                </div>
              );
            })}
          </Scrollbar>
        </div>
      )}
    </div>
  );
};

export default Queue;
