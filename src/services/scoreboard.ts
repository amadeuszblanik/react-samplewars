import { BehaviorSubject } from "rxjs";

export interface Scoreboard {
    player: number;
    opponent: number;
}

const initialState: Scoreboard =  {
    player: 0,
    opponent: 0,
};

const subject = new BehaviorSubject<Scoreboard>(initialState);

export const scoreboardStore = {
    subscription: () => subject.asObservable(),
    addPointPlayer: () => subject.next({ player: subject.value.player + 1, opponent: subject.value.opponent }),
    addPointOpponent: () => subject.next({ player: subject.value.player, opponent: subject.value.opponent + 1 }),
    addPointDraw: () => subject.next({ player: subject.value.player + 1, opponent: subject.value.opponent + 1 })
};
