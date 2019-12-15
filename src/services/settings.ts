import { BehaviorSubject } from "rxjs";
import { KIND } from "../dto";

export interface SettingsCharacter {
  id: number;
  points: number;
}

export interface Settings {
  kind: KIND;
  player: SettingsCharacter;
  opponent: SettingsCharacter;
  npc: {
    player: boolean;
    opponent: boolean;
  };
}

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
    }),
};
