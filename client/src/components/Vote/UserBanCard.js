import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { red, green } from "../../styles/colors";
import noIcon from "../../assets/icons/no-button.svg";
import yesIcon from "../../assets/icons/yes-button.svg";

// Renders the UserBanCard component. The box will be visible if the background is not white.
// This component is used when the user wants to ban someone in the same music room as them.

// enforcer: the user that starts the banning phase
// blockUser: the user that is about to get banned from the music room.
const UserBanCard = ({ enforcer, blockUser }) => {
  // Daniel Gonzalez: Displays the user ban card popup
  return (
    <Box
      sx={{
        width: 400,
        height: 327,
        borderRadius: 5,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: "white",
      }}
    >
      <Container sx={{ paddingTop: 7 }}>
        <Typography variant="h6" textAlign="center">
          {enforcer} wants to ban {blockUser}! Wanna ban?
        </Typography>
      </Container>

      <Container sx={{ paddingTop: 10 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={20}
        >
          {/** No button */}
          <Grid item>
            <Button
              img={noIcon}
              text="No"
              color={red[500]}
              onClick={handleNo}
              alt="No icon"
            />
          </Grid>

          {/** Yes button */}
          <Grid item>
            <Button
              img={yesIcon}
              text="Yes"
              color={green[500]}
              onClick={handleYes}
              alt="Yes icon"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Call this function when user clicks on the yes button
const handleYes = () => {
  console.log("Yes");
};

// Call this function when user clicks on the no button
const handleNo = () => {
  console.log("No");
};

// Button component
// img: button icon
// text: name of the button
// color: color of the button
// onClick: a function that fires when button is clicked
// alt: a phrase that gets rendered when the icon doesn't render properly
function Button({ img, text, color, onClick, alt }) {
  return (
    <Container onClick={onClick}>
      <Grid container direction="column" alignItems="center" spacing={0.5}>
        {/** Shows button icon */}
        <Grid item>
          <img src={img} alt={alt} style={{ width: "100%" }} />
        </Grid>

        {/** Shows button text */}
        <Grid item>
          <Typography variant="body2" sx={{ color: color, fontWeight: "bold" }}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserBanCard;
