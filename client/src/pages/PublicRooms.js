import React, { useState, useEffect } from "react";
import PurpleInput from "../components/Input/PurpleInput";
import { purple, pink } from "../styles/colors";
import { Button, Typography } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore, collection, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import addIcon from "../assets/icons/plus.svg";
import PublicRoomCard from "../components/PublicRoomCard";
import publicRoomImg from "../assets/test.jpg";
import SpotifyWebApi from "spotify-web-api-node";
import RoomHeader from "../components/Header/RoomHeader";

const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

const PublicRooms = ({ accessToken }) => {
  const [search, setSearch] = useState("");
  const [pictureUrl, setPictureUrl] = useState();
  const [searchRes, setSearchRes] = useState([]);

  const firestore = getFirestore();
  const navigate = useNavigate();

  const searchQuery = query(
    collection(firestore, "rooms"),
    where("visibility", "==", false)
  );

  // sets a live hook to query the db
  const [publicRooms, loading, error, snapshot] =
    useCollectionData(searchQuery);

  const joinPublicRoom = (room) => {
    navigate(navigate(`/music?room=${room}`));
  };

  //uses regex to search a room by a term (if it matches room name or genre)
  function filterRooms(term) {
    if (!publicRooms) {
      setSearchRes([]);
      return;
    }
    if (publicRooms.length == 0) {
      setSearchRes([]);
      return;
    }
    if (term == "") {
      setSearchRes(publicRooms);
      return;
    }
    const regex = new RegExp(`${term}[\x00-\x7F]*`);
    let temp = [];
    console.log(regex);
    publicRooms.forEach((room) => {
      if (regex.test(room.code) || regex.test(room.genre)) {
        temp.push(room);
      }
      setSearchRes(temp);
    });
  }

  const closeContainer = {
    backgroundColor: pink[400],
    height: 80,
    width: 80,
    borderRadius: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  const floatingActionButton = {
    position: "fixed",
    bottom: "30px",
    right: "140px",
  };

  //loads api token into the spotify api wrapper
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // gets the user's profile picture
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMe()
      .then((data) => {
        setPictureUrl(data.body.images[0].url);
      })
      .catch((data) => {
        setPictureUrl("");
      });
  }, [accessToken]);

  useEffect(() => {
    if (!publicRooms) {
      setSearchRes([]);
      return;
    }
    if (!search) {
      setSearchRes(publicRooms);
      return;
    }
    filterRooms(search);
  }, [search, publicRooms]);

  return (
    <div>
      <RoomHeader pictureUrl={pictureUrl} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Typography
          variant="h1"
          paddingBottom="15px"
          style={{ color: "white" }}
        >
          Public Rooms
        </Typography>

        <div style={{ marginBottom: "20px" }}>
          <PurpleInput
            text="Look for a certain vibe or name of the public room"
            width={1070}
            searchHandler={setSearch}
            value={search}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: purple[100],
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              height: "400px",
              width: "1032px",
            }}
          >
            {publicRooms && publicRooms.length == 0 && (
              <div>
                <Typography variant="subtitle1" style={{ color: purple[500] }}>
                  Public Rooms are not available. Create one!
                </Typography>
              </div>
            )}
            {searchRes &&
              searchRes.map((room) => {
                return (
                  <div
                    key={room}
                    onClick={() => {
                      navigate(`/music?room=${room.code}`);
                    }}
                    style={{paddingBottom:"10px"}}
                  >
                    <PublicRoomCard
                      name={room.code}
                      genre={room.genre ? `${room.genre}` : "genre: none"}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div
          style={floatingActionButton}
          onClick={() => {
            navigate("/createRoom");
          }}
        >
          <div style={closeContainer}>
            <img src={addIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicRooms;
