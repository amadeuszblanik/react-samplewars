import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const TopBar: React.FunctionComponent = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h5" noWrap>
        React: SampleWars
      </Typography>
    </Toolbar>
  </AppBar>
);

export default TopBar;
