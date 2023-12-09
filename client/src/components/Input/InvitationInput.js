import React, { useState } from "react";
import { TextField } from "@mui/material";
import { purple } from "../../styles/colors";

const InvitationInput = ({ height, width }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <TextField
      variant="outlined"
      placeholder={"Input invitation code"}
      value={searchTerm}
      onChange={e=>setSearchTerm(e.target.value)}
      sx={{
        input: {
          color: purple[200],
          fontSize: 18,
        },
      }}
      InputProps={{ style: { height: 80, width: 620, color: purple[20] } }}
    />
  );
};

export default InvitationInput;
