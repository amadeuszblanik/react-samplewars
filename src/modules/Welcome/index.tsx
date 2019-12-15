import React from "react";
import { TopBar } from "../../components";
import styles from "../../../pages/index.scss";
import Link from "next/link";
import { Fab, Typography } from "@material-ui/core";
import GamesIcon from "@material-ui/icons/Games";
import { Main } from "../../layout";

const Welcome: React.FunctionComponent<{ canPlay?: boolean }> = props => {
  const { canPlay } = props;

  return (
    <Main>
      <main>
        <TopBar />
        <div className={styles.playWrapper}>
          <Link href="/play?kind=people" as="/play/people/">
            <Fab variant="extended" disabled={!canPlay}>
              <GamesIcon />
              {!canPlay ? "Loading…" : "Play"}
            </Fab>
          </Link>
        </div>
        <a href="https://blanik.me">
          <Typography variant="body2" color="textSecondary" align="center">
            Amadeusz Blanik &copy; 2019
          </Typography>
        </a>
      </main>
    </Main>
  );
};

export default Welcome;
