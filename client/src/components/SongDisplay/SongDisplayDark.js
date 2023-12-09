import React, { useState, useEffect } from "react";
import { Card, CardMedia, Stack, Typography, Container, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import { purple } from "../../styles/colors";
//Jocelyn
//Used in ranking and in search
const SongDisplayDark = ({   
    img,
    songName,
    artistName,
    id,
    icon,
    buttonHandler,
    uri,
    songLength,
    updateRanking,
    initialRating
}) => {
    const [value, setValue] = useState(initialRating || 0);

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: "black",
        },
        '& .MuiRating-iconHover': {
            color: "black",
        },
    });

    const handleRatingChange = (event, newValue) => {
        console.log("Rating changed to:", newValue);
        setValue(newValue);
        updateRanking(newValue, id);        
    };

    return (
        <Card
            sx={{ width: "100%", height: 64, backgroundColor: purple[100], borderRadius: 2 }}
            elevation={false}
        >
            <Stack direction="row" spacing={1.5} padding={1} alignItems="center" width={"100%"}>
                <CardMedia
                    sx={{ width: 48, height: 48 }}
                    image={img}
                    style={{ borderRadius: 4, paddingRight: 25 }}
                />
                <Stack direction="column" width={900}>
                    <Typography variant="body2" fontWeight={"bold"}>
                        {songLengthCheck(songName)}
                    </Typography>
                    <Typography variant="body1">
                        {artistLengthCheck(artistName)}
                    </Typography>
                </Stack>
                <Container align="right">
                    <StyledRating
                        name="customized-color"
                        size="large"
                        icon={<StarIcon fontSize="inherit" />}
                        emptyIcon={<StarIcon fontSize="inherit" />}
                        value={value}
                        onChange={handleRatingChange}
                    />
                </Container>
            </Stack>
        </Card>
    );
};

const songLengthCheck = (name) => {
    if (name.length > 55) {
      name = name.substring(0, 55) + "...";
    }
    return name;
  };
  const artistLengthCheck = (name) => {
    if (name.length > 65) {
      name = name.substring(0, 65) + "...";
    }
    return name;
  };
export default SongDisplayDark;