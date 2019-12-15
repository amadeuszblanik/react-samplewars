import { NextPage } from "next";
import React from "react";
import { GameCore } from "../src/modules";
import { KIND } from "../src/dto";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const Game: NextPage<{ kind: KIND }> = ({ kind }) => <GameCore kind={kind} />;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
Game.getInitialProps = async ({ query: { kind } }) => {
  return { kind };
};

export default Game;
