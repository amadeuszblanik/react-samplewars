import { BehaviorSubject } from "rxjs";
import { KIND } from "../dto";
import { Scoreboard, Settings } from "./types";

export type RESULT_SCORE = "player" | "opponent" | "draw" | "unknown";

const initialState: Settings = {
  kind: "people",
  player: {
    id: 0,
    points: 0,
  },
  opponent: {
    id: 0,
    points: 0,
  },
  npc: {
    player: true,
    opponent: true,
  },
  result: "unknown",
  totalMatches: 0,
  scoreboard: {
    player: 0,
    opponent: 0,
  },
};

const subject = new BehaviorSubject<Settings>(initialState);

export const settingsStore = {
  subscription: () => subject.asObservable(),
  setKind: (next: KIND) =>
    subject.next({
      kind: next,
      player: subject.value.player,
      opponent: subject.value.opponent,
      npc: {
        player: subject.value.npc.player,
        opponent: subject.value.npc.opponent,
      },
      result: subject.value.result,
      totalMatches: subject.value.totalMatches,
      scoreboard: subject.value.scoreboard,
    }),
  setPlayer: (id: number, points: number) =>
    subject.next({
      kind: subject.value.kind,
      player: {
        id,
        points,
      },
      opponent: subject.value.opponent,
      npc: {
        player: subject.value.npc.player,
        opponent: subject.value.npc.opponent,
      },
      result: subject.value.result,
      totalMatches: subject.value.totalMatches,
      scoreboard: subject.value.scoreboard,
    }),
  setOpponent: (id: number, points: number) =>
    subject.next({
      kind: subject.value.kind,
      player: subject.value.player,
      opponent: {
        id,
        points,
      },
      npc: {
        player: subject.value.npc.player,
        opponent: subject.value.npc.opponent,
      },
      result: subject.value.result,
      totalMatches: subject.value.totalMatches,
      scoreboard: subject.value.scoreboard,
    }),
  setPlayerNPC: (next: boolean) =>
    subject.next({
      kind: subject.value.kind,
      player: subject.value.player,
      opponent: subject.value.opponent,
      npc: {
        player: next,
        opponent: subject.value.npc.opponent,
      },
      result: subject.value.result,
      totalMatches: subject.value.totalMatches,
      scoreboard: subject.value.scoreboard,
    }),
  setOpponentNPC: (next: boolean) =>
    subject.next({
      kind: subject.value.kind,
      player: subject.value.player,
      opponent: subject.value.opponent,
      npc: {
        player: subject.value.npc.player,
        opponent: next,
      },
      result: subject.value.result,
      totalMatches: subject.value.totalMatches,
      scoreboard: subject.value.scoreboard,
    }),
  setResult: (next: RESULT_SCORE) =>
    subject.next({
      kind: subject.value.kind,
      player: subject.value.player,
      opponent: subject.value.opponent,
      npc: {
        player: subject.value.npc.player,
        opponent: subject.value.npc.opponent,
      },
      result: next,
      totalMatches: subject.value.totalMatches,
      scoreboard: subject.value.scoreboard,
    }),
  setTotalMatches: (next: number) =>
    subject.next({
      kind: subject.value.kind,
      player: subject.value.player,
      opponent: subject.value.opponent,
      npc: {
        player: subject.value.npc.player,
        opponent: subject.value.npc.opponent,
      },
      result: subject.value.result,
      totalMatches: next,
      scoreboard: subject.value.scoreboard,
    }),
  setScoreboard: (next: Scoreboard) =>
    subject.next({
      kind: subject.value.kind,
      player: subject.value.player,
      opponent: subject.value.opponent,
      npc: {
        player: subject.value.npc.player,
        opponent: subject.value.npc.opponent,
      },
      result: subject.value.result,
      totalMatches: subject.value.totalMatches,
      scoreboard: next,
    }),
};
