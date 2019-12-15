import React, { useEffect } from "react";
import { Footer, TopBar } from "../../components";
import Link from "next/link";
import { Button, Container, Fab } from "@material-ui/core";
import GamesIcon from "@material-ui/icons/Games";
import { Main } from "../../layout";
import styled from "styled-components";

const StyledMain = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(var(--wh) - 64px);
  --wh: 100vh;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  margin-bottom: auto;
  @media screen and (min-width: 520px) {
    flex-direction: row;
  }
`;

const WrapperButton = styled.div`
  margin: 16px;
`;

const Welcome: React.FunctionComponent<{ canPlay?: boolean }> = props => {
  const { canPlay } = props;

  useEffect(() => {
    if (typeof window === "object") {
      document.documentElement.style.setProperty("--wh", `${window.innerHeight}px`);
      window.addEventListener("resize", () => {
        document.documentElement.style.setProperty("--wh", `${window.innerHeight}px`);
      });
    }
  });

  const handleReset = () => {
    localStorage.removeItem("apiDataSaved");
    localStorage.removeItem("apiDataSavedTimestamp");
    location.reload();
  };

  return (
    <Main>
      <TopBar />
      <StyledMain>
        <ButtonWrapper>
          <Link href="/play?kind=people" as="/play/people/">
            <Fab variant="extended" disabled={!canPlay}>
              <GamesIcon />
              {!canPlay ? "Loading…" : "Play"}
            </Fab>
          </Link>
          <WrapperButton>
            <Button variant="contained" color="secondary" onClick={handleReset} disabled={!canPlay}>
              Reset
            </Button>
          </WrapperButton>
        </ButtonWrapper>
        <Footer variant="primary" />
      </StyledMain>
    </Main>
  );
};

export default Welcome;
