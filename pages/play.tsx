import React from "react";
import { GameCore } from "../src/modules";
import { KIND } from "../src/dto";
import { NextPage } from "next";

interface StatelessPage<P = {}> extends NextPage<P> {
  getInitialProps?: (ctx: any) => Promise<P>;
}

const Game: StatelessPage<{ kind: KIND }> = ({ kind }) => <GameCore kind={kind} />;

Game.getInitialProps = async ({ query: { kind } }) => {
  return { kind };
};

export default Game;
