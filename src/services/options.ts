import { Subject } from "rxjs";

const subject = new Subject();

export interface OptionsService {
    kind: string;
    playerId: number;
    opponentId: number;
}

const initialState: OptionsService = {
    kind: "people",
    playerId: 1,
    opponentId: 2,
};

const state = initialState;

export const optionsService = {
    setOption: (kind: keyof typeof initialState, value: unknown) => {
        // @ts-ignore
        state[kind] = value;
        subject.next({ state });
    },
    getOptions: () => subject.asObservable(),
};
