import React, { useState, useEffect } from "react";
import HomeHeader from "../components/Header/HomeHeader";
import SpotifyWebApi from "spotify-web-api-node";
import PurpleInput from "../components/Input/PurpleInput";
import { Stack, Typography } from "@mui/material";
import HomeCard from "../components/HomeCard";
import joinRoomIcon from "../assets/icons/join-room.svg";
import createRoomIcon from "../assets/icons/room.svg";
import cartIcon from "../assets/icons/cart.svg";
import { useNavigate } from "react-router-dom";
import RoomJoin from "../components/RoomCreation/RoomJoin";
import { purple, pink } from "../styles/colors";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore, collection, query, where } from "firebase/firestore";
import { Scrollbar } from "react-scrollbars-custom";
import earthIcon from "../assets/icons/earth.svg";

const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

const HomePage = ({ accessToken }) => {
  const [pictureUrl, setPictureUrl] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchRes, setSearchRes] = useState([]);

  const firestore = getFirestore();

  const searchQuery = query(
    collection(firestore, "rooms"),
    where("visibility", "==", false)
  );

  const [publicRooms, loading, error, snapshot] =
    useCollectionData(searchQuery);

  const navigate = useNavigate();

  const openPopup = (card) => {
    setSelectedCard(card);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedCard(null);
    setIsPopupOpen(false);
  };

  // user navigates to shopping page
  const handleShopping = () => {
    navigate("/shopping");
  };

  const handleCreateRoom = () => {
    navigate("/createRoom");
  };

  const handlePublicRooms = () => {
    navigate("/public");
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

  // Lydia Yang
  // Displays the home page's cards
  const cards = [
    { text: "Public Rooms", img: earthIcon, handle: handlePublicRooms },
    { text: "Join a room", img: joinRoomIcon },
    { text: "Create a room", img: createRoomIcon, handle: handleCreateRoom },
    { text: "Music Shopping", img: cartIcon, handle: handleShopping },
  ];

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

  return (
    <div>
      <HomeHeader pictureUrl={pictureUrl} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
          marginTop: "40px",
        }}
      >
        {/**HomeCard */}
        <Stack direction="row" spacing={4}>
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => {
                if (index === 1) {
                  openPopup(card);
                }
              }}
            >
              <HomeCard text={card.text} img={card.img} handle={card.handle} />
            </div>
          ))}
        </Stack>
      </div>

      {/* Popup */}
      {/* Lydia Yang */}
      {isPopupOpen && (
        <div style={popup}>
          <RoomJoin
            handleClose={closePopup}
            // handleJoinRoom={handleJoinRoom}
            navigate={navigate}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
