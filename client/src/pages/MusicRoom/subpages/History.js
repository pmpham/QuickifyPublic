import React, { useState, useEffect } from "react";
import { purple } from "../../../styles/colors";
import { Scrollbar } from "react-scrollbars-custom";
import { useLocation } from "react-router-dom";
import SongDisplayDark from "../../../components/SongDisplay/SongDisplayDark";
//Jocelyn
//history data references the database, update ranking is function to update the ranking in database
const History = ({ historyData, updateRanking }) => {  
  const historyContainer = {
    width: "1080px",
    height: "100%",
    backgroundColor: purple[50],
    padding: "20px",
    paddingTop: "0px",
    overflow: "auto",
  };

  return (
    <div style={historyContainer}>
          <Scrollbar
            wrapperProps={{ style: { width: "100%" } }}
            thumbYProps={{ style: { background: purple[700] } }}
            trackYProps={{
            style: { width: "8px" },
            }}
          >
            <div style={{ alignItems: "center", flexDirection: "column"}}>
              {/* Displays the added song in history */}
              {historyData && historyData.length > 0 ? (
                historyData.map((track, index) => {
                  return (
                    <div key={index} style={{ marginBottom: "8px" }} >
                      <SongDisplayDark 
                        img={track.img}
                        songName={track.songName}
                        artistName={track.artistName}
                        id={track.id}
                        uri={track.uri}
                        songLength={track.duration_ms}
                        updateRanking={updateRanking}
                        initialRating={track.stars}
                      />
                    </div>
                  ); 
               })
              ) : (
                <p>No history data available</p>
              )}
              </div>
          </Scrollbar>
    </div>
  );
};

export default History;
