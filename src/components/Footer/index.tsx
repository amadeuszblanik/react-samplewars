import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const StyledFooter = styled.footer<{ color: "primary" | "secondary" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;

  a {
    position: relative;
    display: block;

    & > * {
      position: relative;
      z-index: ${({ theme }) => theme.zIndex.z20};
    }

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;

      display: block;
      width: 100%;
      height: 1px;
      max-height: 1px;
      background-color: ${({ theme, color }) => theme.palette[color]};
      transition: max-height 750ms cubic-bezier(0.4, 0, 0.2, 1);
      z-index: ${({ theme }) => theme.zIndex.z10};
    }

    &:link,
    &:visited {
      text-decoration: none;
    }
    &:hover,
    &:active {
      &:after {
        height: 100%;
        max-height: 100%;
      }
    }
  }
`;

const Footer: React.FunctionComponent<{ variant: "primary" | "secondary" }> = ({ variant }) => (
  <StyledFooter color={variant}>
    <a href="https://blanik.me">
      <Typography variant="body2" color="textSecondary" align="center">
        Amadeusz Blanik &copy; 2019
      </Typography>
    </a>
  </StyledFooter>
);

export default Footer;
