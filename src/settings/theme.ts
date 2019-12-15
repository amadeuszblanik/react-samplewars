import { createMuiTheme } from "@material-ui/core/styles";
import { blue, deepPurple } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    type: "dark",
  },
});

export const styledTheme = {
  palette: {
    primary: deepPurple["400"],
    secondary: blue["400"],
  },
  zIndex: {
    z10: 1000,
    z20: 1020,
  },
};
