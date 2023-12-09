import React, { useState, useEffect } from "react";
import { purple } from "../../../styles/colors";
import { Scrollbar } from "react-scrollbars-custom";
import { useLocation } from "react-router-dom";
import SongDisplayDark from "../../../components/SongDisplay/SongDisplayDark";
import SongDisplayOrdered from "../../../components/SongDisplay/SongDisplayOrdered";
//Jocelyn
//Shows ranking of songs based on stars given in song history tab
const Ranking = ({ rankingData, readRank }) => { 
  const [songRanks, setSongRanks] = useState({});
  const sortedRankingData = rankingData.slice().sort((a, b) => b.stars - a.stars);

  const rankingContainer = {
    width: "1080px",
    height: "100%",
    backgroundColor: purple[50],
    padding: "20px",
    paddingTop: "0px",
    overflow: "auto",
  };
  useEffect(() => {
    const fetchRanks = async () => {
      //based on number of stars this created new ranking so 1 star isnt considered the top song
      const newSongRanks = {};
      for (const track of sortedRankingData) {
        try {
          const rank = await readRank(track.id);
          newSongRanks[track.id] = rank;
        } catch (error) {
          console.error(`Error fetching rank for song ${track.id}: ${error.message}`);
        }
      }
      setSongRanks(newSongRanks);
    };
    fetchRanks();
  }, [sortedRankingData, readRank]);

  return (
    <div style={rankingContainer}>
          <Scrollbar
            wrapperProps={{ style: { width: "100%" } }}
            thumbYProps={{ style: { background: purple[700] } }}
            trackYProps={{
            style: { width: "8px" },
            }}
          >
            <div style={{ alignItems: "center", flexDirection: "column"}}>
              {/* Displays the added song in history */}
              {sortedRankingData && sortedRankingData.length > 0 ? (
                sortedRankingData.map((track, index) => {
                  return (
                    <div key={index} style={{ marginBottom: "8px" }} >
                      <SongDisplayOrdered 
                        img={track.img}
                        songName={track.songName}
                        artistName={track.artistName}
                        rank={songRanks[track.id]}
                        numStars={track.rank}
                        displayColor={purple[100]}
                        id={track.id}
                        uri={track.uri}
                        songLength={track.duration_ms}
                      />
                    </div>
                  ); 
               })
              ) : (
                <p>No ranking data available</p>
              )}
              </div>
          </Scrollbar>
    </div>
  );
};

export default Ranking;
