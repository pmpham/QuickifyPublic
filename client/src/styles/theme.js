// import { createTheme } from "@mui/material";

import { green, pink, purple, red } from "./colors";
import { createTheme } from "@mui/material";

const theme = createTheme({
  //colors
  palette: {
    //purple
    purple_50: {
      main: purple[50],
    },
    purple_100: {
      main: purple[100],
    },
    purple_200: {
      main: purple[200],
    },
    purple_300: {
      main: purple[300],
    },
    purple_400: {
      main: purple[400],
    },
    purple_500: {
      main: purple[500],
    },
    purple_600: {
      main: purple[600],
    },
    purple_700: {
      main: purple[700],
    },
    purple_800: {
      main: purple[800],
    },
    purple_900: {
      main: purple[900],
    },

    //pink
    pink_50: {
      main: pink[50],
    },
    pink_100: {
      main: pink[100],
    },
    pink_200: {
      main: pink[200],
    },
    pink_300: {
      main: pink[300],
    },
    pink_400: {
      main: pink[400],
    },
    pink_500: {
      main: pink[500],
    },
    pink_600: {
      main: pink[600],
    },
    pink_700: {
      main: pink[700],
    },
    pink_800: {
      main: pink[800],
    },
    pink_900: {
      main: pink[900],
    },

    // red
    red_500: {
      main: red[500],
    },

    red_200: {
      main: red[200],
    },

    //green
    green_500: {
      main: green[500],
    },
  },

  //typography
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(", "),

    //headings
    h1: {
      fontSize: 48,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 39,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 33,
      fontWeight: "bold",
    },
    h4: {
      fontSize: 28,
      fontWeight: "bold",
    },
    h5: {
      fontSize: 23,
      fontWeight: "bold",
    },
    h6: {
      fontSize: 20,
      fontWeight: "bold",
    },

    //subheading
    subtitle1: {
      fontSize: 19,
    },
    subtitle2: {
      fontSize: 18,
    },

    //paragraph
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 16,
    },

    //caption
    caption: {
      fontSize: 12,
    },
  },
});

export default theme;
