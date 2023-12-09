import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import HomeHeader from "../../components/Header/HomeHeader";
import { Box, Typography, Button, Stack, Grid, Switch } from "@mui/material";
import { purple, pink } from "../../styles/colors";
import { useNavigate, useParams } from "react-router-dom";
import RoomCreation from "../../components/RoomCreation/RoomCreation";
import { Scrollbar } from "react-scrollbars-custom";
//Jocelyn
//Details for creating room - explicit music allowed toggle, private room or not, genre of the room
//after room is created it gives user code to the room and redirects to the created room
const spotifyApi = new SpotifyWebApi({
  clientId: "fd01b946bd9343d584608c1908851848",
});

const RoomCreationDetail = ({ accessToken }) => {
  const [pictureUrl, setPictureUrl] = useState();
  const [genres, setGenre] = useState([]);
  const [explicitMusicEnabled, setExplicitMusicEnabled] = useState(false);
  const [privateRoomEnabled, setPrivateRoomEnabled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { roomName } = useParams();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const navigate = useNavigate();
  
  const handleToggleExplicitMusic = () => { //changing state for explicit music
    setExplicitMusicEnabled(!explicitMusicEnabled);
    console.log("explicit music was enabled or disabled");
  };
  const handleTogglePrivateRoom = () => { //changing state for private room
    setPrivateRoomEnabled(!privateRoomEnabled);
    console.log("private room was enabled or disabled");
  };
  const handleGenreClick = (genre) => { //when user clicks a genre
    console.log(`Genre "${genre}" clicked`);
    setSelectedGenre(genre); 
  };
  // popup stuff - might need to change to take into consideration when user clicks back button on browser
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
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
  // user navigates to music room after pressing next
  const handleCreateRoom = () => {
    navigate("/music");
    console.log("going to created music room")
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
// get all genres from spotify api
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getAvailableGenreSeeds()
      .then((data) => {
        setGenre(data.body.genres);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
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
        <Stack direction="column" paddingTop={4.5} alignItems="center">
          <Typography
            paddingBottom={1}
            variant="h3"
            fontWeight="regular"
            style={{ color: purple[400] }}
          >
            Nice choice.
          </Typography>
          <Typography
            paddingBottom={3}
            align="center"
            variant="h2"
            style={{ color: purple[500] }}
          >
            Let's get into the smaller details...
          </Typography>
        </Stack>
        <Typography
          paddingLeft={8}
          align="left"
          paddingBottom={2}
          fontWeight="bold"
          variant="h4"
          color={purple[500]}
        >
          Pick a genre
        </Typography>
        <Box
          width={1147}
          height={228}
          backgroundColor={purple[100]}
          style={{ borderRadius: 8 }}
        >
        <Scrollbar style={{ width: "99%", height: "100%" }}>
            <Grid container style={{width: "100%"}} paddingTop={1}> 
              {genres.map((genre, index) => (
                <Grid item xs={1.5} key={index}>
                  <button
                    onClick={() => handleGenreClick(genre)}
                    style={{
                      width: "100%",
                      height: "60px",
                      background: selectedGenre === genre ? "rgba(115, 100, 139, 0.3)" : "none",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      style={{ color: purple[500] }}
                      align="center"
                    >
                      {genre}
                    </Typography>
                  </button>
                </Grid>
              ))}
            </Grid>
          </Scrollbar>
        </Box>
        <Stack
          direction="row"
          align="left"
          paddingLeft={8}
          paddingTop={3.75}
          alignItems="center"
        >
          <Typography
            style={{ color: purple[500] }}
            fontWeight="bold"
            variant="h5"
          >
            Enable explicit music
          </Typography>
          <Switch
            checked={explicitMusicEnabled}
            onChange={handleToggleExplicitMusic}
            style={{ color: purple[500] }}
          />
        </Stack>
        <Stack
          direction="row"
          align="left"
          paddingLeft={8}
          paddingTop={3}
          alignItems="center"
        >
          <Typography
            style={{ color: purple[500] }}
            fontWeight="bold"
            variant="h5"
          >
            Enable this as private room
          </Typography>
          <Switch
            checked={privateRoomEnabled}
            onChange={handleTogglePrivateRoom}
            style={{ color: purple[500] }}
          />
        </Stack>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          paddingRight={3.5}
          marginTop={-2}
        >
          <Grid item>
            <Button
              style={{
                width: 138,
                height: 62,
                backgroundColor: pink[500],
                borderRadius: 20,
              }}
              onClick={openPopup}
            >
              <Typography
                align="center"
                variant="subtitle2"
                color="white"
                padding={2}
              >
                {"Next"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Popup */}
      {isPopupOpen && (
        <div style={popup}>
          <RoomCreation
            handleClose={closePopup}
            handleCreateRoom={handleCreateRoom}
            navigate={navigate}
            invitationCode={roomName}
            visibility={privateRoomEnabled}
            genre={selectedGenre}
          />
        </div>
      )}
    </div>
  );
};

export default RoomCreationDetail;
