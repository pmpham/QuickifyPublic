import React, { useState } from "react";
import { pink, purple } from "../../styles/colors";
import { Typography, Stack } from "@mui/material";
import ChatInput from "../Input/ChatInput";
import MessageBox from "./MessageBox";
import { Scrollbar } from "react-scrollbars-custom";
import sendIcon from "../../assets/icons/send.svg";
import chatIcon from "../../assets/icons/chat-icon.svg";
import closeIcon from "../../assets/icons/close-24.svg";

const Chat = ({
  currentMessageHandler,
  messageList,
  submit,
  pictureUrl,
  value,
  userID,
}) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [showChatCircle, setShowChatCircle] = useState(true);

  const handleOpen = () => {
    setShowChatBox(true);
    setShowChatCircle(false);
  };

  const handleClose = () => {
    setShowChatBox(false);
    setShowChatCircle(true);
  };

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

  const openContainer = {
    width: "436px",
    height: "456px",
    borderRadius: "8px",
    backgroundColor: purple[400],
  };

  const header = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "339px",
  };

  const chatFrame = {
    height: "324px",
    width: "404px",
    backgroundColor: purple[50],
    borderRadius: "8px",
    overflow: "auto",
    paddingTop: "8px",
  };

  const iconStyle = {
    width: "40%",
    height: "auto",
  };

  return (
    <div>
      {showChatCircle && (
        <div style={closeContainer}>
          <img
            src={chatIcon}
            alt="Chat Icon"
            style={iconStyle}
            onClick={handleOpen}
          />
        </div>
      )}

      {showChatBox && (
        <div style={openContainer}>
          <div
            style={{
              paddingTop: "10px",
              paddingBottom: "16px",
              paddingLeft: "16px",
            }}
          >
            <div style={{ paddingBottom: "8px" }}>
              <div style={header}>
                <Typography variant="h6" style={{ color: "white" }}>
                  Chat
                </Typography>
                <div>
                  <img
                    src={closeIcon}
                    onClick={handleClose}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            {/* Chat Frame */}
            <div style={chatFrame}>
              <Scrollbar
                thumbYProps={{ style: { background: purple[700] } }}
                trackYProps={{
                  style: { width: "8px", marginLeft: "5px" },
                }}
              >
                {/* Chat Messages */}
                {messageList.map((messageContent) => {
                  return (
                    <div
                      style={{
                        marginBottom: "8px",
                        paddingRight: "12px",
                        paddingLeft: "12px",
                      }}
                    >
                      <MessageBox
                        pictureUrl={pictureUrl}
                        message={messageContent.message}
                        isSender={
                          userID === messageContent.author ? true : false
                        }
                      />
                    </div>
                  );
                })}
              </Scrollbar>
            </div>

            {/*  Chat Input */}
            <div style={{ marginTop: "14px" }}>
              <Stack direction="row" spacing={1}>
                <ChatInput
                  value={value}
                  currentMessageHandler={currentMessageHandler}
                />
                <img src={sendIcon} alt="send icon" onClick={submit} />
              </Stack>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
