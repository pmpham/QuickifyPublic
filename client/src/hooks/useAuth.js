import { useState, useEffect } from "react";
import axios from "axios";
import socket from "./socket";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8000/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

        // debugging purposes
        // setExpiresIn(61);

        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("http://localhost:8000/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);

          // debugging purposes
          // setExpiresIn(61);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    socket.on("tokenRefreshed", (data) => {
      setAccessToken(data.accessToken);
      setExpiresIn(data.expiresIn);
    });

    return () => {
      clearInterval(interval);
      socket.off("tokenRefreshed");
    };
  }, [refreshToken, expiresIn]);

  return accessToken;
}
