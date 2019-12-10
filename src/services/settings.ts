import {BehaviorSubject} from "rxjs";
import {KIND} from "../dao/types";

export interface Settings {
    kind: KIND;
    player: number;
    opponent: number;
}

const initialState: Settings = {
    kind: "people",
    player: 0,
    opponent: 0
};

const subject = new BehaviorSubject<Settings>(initialState);

export const settingsStore = {
    subscription: () => subject.asObservable(),
    setKind: (next: KIND) => subject.next({ kind: next, player: subject.value.player, opponent: subject.value.opponent }),
    setPlayer: (next: number) => subject.next({ kind: subject.value.kind, player: next, opponent: subject.value.opponent }),
    setOpponent: (next: number) => subject.next({ kind: subject.value.kind, player: subject.value.player, opponent: next })
};
