import React, { useState, useEffect } from "react";
import HomeHeader from "../../components/Header/HomeHeader";
import SpotifyWebApi from "spotify-web-api-node";
import { Box, Typography, Button, Stack } from "@mui/material";
import { purple, pink } from "../../styles/colors";
import NameInput from "../../components/Input/NameInput";
import { useNavigate } from "react-router-dom";
//Jocelyn
//redirected to from home page, creates a name for the music room and redirected to room details page
const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

const RoomCreationName = ({ accessToken }) => {
  const [pictureUrl, setPictureUrl] = useState();
  const [userName, setUsername] = useState();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  //function to handle user input from NameInput
  const handleUserInput = (inputValue) => {
    setRoomName(inputValue); // Update the state with user input
  };
  // user navigates to room details page and takes roomName with them
  const handleRoomDetails = () => {
    navigate(`/createRoomDetail/${roomName}`);
    console.log("room code is: ", roomName, "going to room details" )
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
    
  // gets the user's display name
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMe()
      .then((data) => {
        setUsername(data.body.display_name);
      })
      .catch((data) => {
        setUsername("");
      });
  }, [accessToken]);

  return (
    <div align="center">
      <HomeHeader pictureUrl={pictureUrl} />
      <Box
        width={1280}
        height={636}
        style={{
          backgroundColor: purple[50],
          borderRadius: 8,
          marginTop: 14.25,
        }}
      >
        <Stack direction="column" paddingTop={25} alignItems="center">
          <Typography
            variant="h3"
            fontWeight="regular"
            style={{ color: purple[400] }}
          >
            {"Hello " + userName}
          </Typography>
          <Typography
            paddingBottom={10.75}
            align="center"
            variant="h2"
            style={{ color: purple[500] }}
          >
            Let's start by creating a unique music room name:
          </Typography>
          <NameInput onUserInput={handleUserInput}/>
        </Stack>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "86px",
          }}
        >
          <Button
            style={{
              width: 138,
              height: 62,
              backgroundColor: pink[500],
              borderRadius: 20,
            }}
            onClick={handleRoomDetails}
          >
            <Typography
              align="center"
              variant="subtitle2"
              color={"white"}
              padding={2}
            >
              {"Submit"}
            </Typography>
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default RoomCreationName;
