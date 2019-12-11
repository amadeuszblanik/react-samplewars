import {BehaviorSubject} from "rxjs";
import {KIND} from "../dao/types";

export interface Settings {
    kind: KIND;
    player: number;
    opponent: number;
    npc: {
        player: boolean;
        opponent: boolean;
    };
}

const initialState: Settings = {
    kind: "people",
    player: 0,
    opponent: 0,
    npc: {
        player: true,
        opponent: true,
    }
};

const subject = new BehaviorSubject<Settings>(initialState);

export const settingsStore = {
    subscription: () => subject.asObservable(),
    setKind: (next: KIND) => subject.next({
        kind: next,
        player: subject.value.player,
        opponent: subject.value.opponent,
        npc: {
            player: subject.value.npc.player,
            opponent: subject.value.npc.opponent,
        }
    }),
    setPlayer: (next: number) => subject.next({
        kind: subject.value.kind,
        player: next,
        opponent: subject.value.opponent ,
        npc: {
            player: subject.value.npc.player,
            opponent: subject.value.npc.opponent,
        }
    }),
    setOpponent: (next: number) => subject.next({
        kind: subject.value.kind,
        player: subject.value.player,
        opponent: next,
        npc: {
            player: subject.value.npc.player,
            opponent: subject.value.npc.opponent,
        }
    }),
    setPlayerNPC: (next: boolean) => subject.next({
        kind: subject.value.kind,
        player: subject.value.player,
        opponent: subject.value.opponent,
        npc: {
            player: next,
            opponent: subject.value.npc.opponent,
        }
    }),
    setOpponentNPC: (next: boolean) => subject.next({
        kind: subject.value.kind,
        player: subject.value.player,
        opponent: subject.value.opponent,
        npc: {
            player: subject.value.npc.player,
            opponent: next,
        }
    })
};
