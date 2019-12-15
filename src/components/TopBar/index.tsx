import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const StyledAppbar = styled(AppBar)`
  color: #fff;
  background-color: #1F1B25;
`

const TopBar: React.FunctionComponent = () => (
  <StyledAppbar position="static" color="inherit">
    <Toolbar>
      <Typography variant="h5" noWrap>
        React: SampleWars
      </Typography>
    </Toolbar>
  </StyledAppbar>
);

export default TopBar;
