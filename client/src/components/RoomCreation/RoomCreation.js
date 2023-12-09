import React, { useState } from "react";
import { Button, Card, Container, Typography } from "@mui/material";
import { purple } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import socket from "../../hooks/socket";
import {app} from "../../hooks/firebase" 
import {
    getFirestore, doc,
    collection, setDoc
} from "firebase/firestore";
//Jocelyn
//used in room creation page
const RoomCreation = ({invitationCode, visibility, genre}) => {
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    const firestore = getFirestore();
    // user navigates to music room after pressing copy code and code gets copied to clipboard
    const handleCreateRoom = () => {
        navigate("/music");
        console.log("going to created music room and code copied")
        if (invitationCode.trim() !== "") {
            socket.emit("joinRoom", invitationCode);
            //adds to db when a room is created
            setDoc(doc(collection(firestore, "rooms"),invitationCode), {
                code:invitationCode,
                visibility: visibility,
                genre:genre
              });
            copyToClipboard(invitationCode);
            navigate(`/music?room=${invitationCode}`);
          } else {
            setHasError(true);
          }
      }

    // Function to copy text to the clipboard
    const copyToClipboard = (text) => {
        const textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };
    return (
        <Card //main background of component
            sx={{width: 700, height: 400, backgroundColor: purple[400], borderRadius: 8}}
            elevation = {"false"}
        >
            {/* Join a room */}
            <Typography align="center" variant="h2" color={"white"} paddingTop={4} paddingBottom={4}>
                Congratulations!<br />You just created a music room
            </Typography>

            <Container align="center">
                <Typography variant="subtitle1" color={"white"} paddingBottom={3}>
                    {"Your room code is:"}
                </Typography>
                {/* Box for invitation code input */}
                <Container
                    sx={{width: 620, height: 80, backgroundColor: "white"}}
                    style={{borderRadius: 4, border: "2px solid", borderColor: purple[200]}}    
                >
                    <Typography variant="h5" style={{opacity: 0.6}} paddingTop={3}>
                        {invitationCode}
                    </Typography>
                </Container>
                <Button onClick={handleCreateRoom}>
                    <Typography variant="body2" color={"white"} padding={3} style={{textDecorationLine: "underline"}} paddingTop={4}>
                        {"Click to copy code"}
                    </Typography>
                </Button>
            </Container>
        </Card>
    );
};

export default RoomCreation;