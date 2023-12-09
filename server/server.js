const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// socket.io functions
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // join a specified room
  socket.on("joinRoom", (roomNumber) => {
    socket.join(roomNumber);
    socket.to(roomNumber).emit("requestQueue", (data) => {});
    console.log(`User ${socket.id} joined room ${roomNumber}`);
  });

  // handle incoming messages
  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data);
    console.log("Message sent:", data);
  });

  socket.on("sendQueue", (data) => {
    socket.to(data.room).emit("receiveQueue", data);
    console.log("Sent queue:", data);
  });

  socket.on("requestQueue", (data) => {
    socket.to(data.room).emit("requestQueue", data);
  });

  // handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// refreshes spotify api token
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fd01b946bd9343d584608c1908851848",
    clientSecret: "100a3c493fbf49f09551446a1fc326e5",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// manages user login
app.post("/login", (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fd01b946bd9343d584608c1908851848",
    clientSecret: "100a3c493fbf49f09551446a1fc326e5",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
