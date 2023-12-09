import React from "react";
import Button from "@mui/material/Button";

// Lydia Yang, Peter Pham
// Sends Spotify API of what data we want
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fd01b946bd9343d584608c1908851848&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20user-top-read%20user-follow-read%20playlist-modify-private%20playlist-modify-public";

const Login = () => {
  return (
    <Button variant="contained" href={AUTH_URL}>
      Login with Spotify
    </Button>
  );
};

export default Login;
