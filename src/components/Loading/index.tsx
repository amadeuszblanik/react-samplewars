import React, {useEffect} from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { Main } from "../../layout";
import {Footer, Link, TopBar} from "../index";
import styled from "styled-components";

interface LoadingProps {
  content?: string;
}

const clearLocalStorage = () => {
  localStorage.removeItem("apiDataSaved");
  localStorage.removeItem("apiDataSavedTimestamp");
};

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(var(--wh) - 64px);
  --wh: 100vh;
`;

StyledMain.displayName = "Main";

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

ContentWrapper.displayName = "Content";

const Loading: React.FunctionComponent<LoadingProps> = props => {
  const { content } = props;

  useEffect(() => {
    if (typeof window === "object") {
      document.documentElement.style.setProperty("--wh", `${window.innerHeight}px`);
      window.addEventListener("resize", () => {
        document.documentElement.style.setProperty("--wh", `${window.innerHeight}px`);
      });
    }
  });

  return (
    <Main>
      <TopBar />
      <StyledMain>
        <Container>
          <ContentWrapper>
            <Typography variant="h5" color="textSecondary" align="center">
              {content}
            </Typography>
            <Link href="/">
              <Button variant="contained" onClick={clearLocalStorage}>
                Restart
              </Button>
            </Link>
          </ContentWrapper>
        </Container>
      </StyledMain>
      <Footer variant="primary" />
    </Main>
  );
};

Loading.defaultProps = {
  content: "Loading…",
};

export default Loading;
