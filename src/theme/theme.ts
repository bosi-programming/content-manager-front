import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    textColor: Palette["primary"];
    backgroundColor: Palette["primary"];
  }
  interface PaletteOptions {
    textColor: PaletteOptions["primary"];
    backgroundColor: PaletteOptions["primary"];
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1F2833",
    },
    secondary: {
      main: "#45A29E",
    },
    textColor: {
      main: "#0B0C10",
    },
    backgroundColor: {
      main: "#C5C6C7",
    },
  },
});
