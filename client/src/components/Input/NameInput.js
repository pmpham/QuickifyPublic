import React, { useState } from "react";
import { TextField } from "@mui/material";
import { purple } from "../../styles/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const NameInput = ({ height, width, onUserInput }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    onUserInput(newValue);
  };

  const theme = createTheme({
    palette: {
      purple: {
        main: "#9794b5",
      },
    },
  });
  //"#9794b5"

  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="standard"
        color="purple"
        placeholder={"Enter a name here"}
        value={searchTerm}
        onChange={handleInputChange}
        focused
        sx={{
          input: {
            color: purple[300],
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
        InputProps={{ style: { height: 40, width: 1152, color: "white" } }}
      />
    </ThemeProvider>
  );
};

export default NameInput;
