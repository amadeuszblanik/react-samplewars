import React from "react";
import { Main } from "../src/layout";
import styles from "./index.scss";
import {Container, Grid, Typography} from "@material-ui/core";
import {Controls, Details, TopBar, SelectPlayer, Loading} from "../src/components";
import {KIND, ResultListResponse, ResultListResponseSingle} from "../src/dao/types";
import {Subscription} from "rxjs";
import {settingsStore} from "../src/services";
import {Settings} from "../src/services/settings";
import {getRandomNumber} from "../src/utils";

type RESULT_SCORE = "player" | "opponent" | "draw" | "unknown";

interface PlayProps {
    kind: KIND;
}

export interface Scoreboard {
    player: number;
    opponent: number;
}

interface PlayState {
    apiData: ResultListResponse | false;
    apiStatus: boolean;
    currentResult: RESULT_SCORE;
    characters: {
        player: number;
        opponent: number;
    };
    result: RESULT_SCORE;
    totalMatches: number;
    npc?: {
        player: boolean;
        opponent: boolean;
    };
}

interface HomeGetInitialProps {
    query: {
        kind: KIND;
    };
    req: any;
}

class Play extends React.Component<PlayProps, PlayState> {
    private scoreboard: Scoreboard = {
        player: 0,
        opponent: 0,
    };
    private settingsSubscriber: Subscription | undefined;

    constructor(props: PlayProps) {
        super(props);

        this.state = {
            apiData: false,
            apiStatus: true,
            currentResult: "draw",
            characters: {
                player: 0,
                opponent: 0,
            },
            result: "unknown",
            totalMatches: 0
        };
    }

    static async getInitialProps({ query: { kind } }: HomeGetInitialProps) {
        return { kind };
    }

    componentDidMount() {
        this.settingsSubscriber = settingsStore.subscription().subscribe(this.handleSettingsSubscriber);
        const apiDataInLocalStorage = localStorage.getItem("apiDataSaved");

        if (!apiDataInLocalStorage) {
            this.setState({ apiStatus: false });
            return;
        }

        this.setState({
            apiData: JSON.parse(apiDataInLocalStorage),
        });
    }

    componentWillUnmount() {
        if (this.settingsSubscriber === undefined) {
            return;
        }

        this.settingsSubscriber.unsubscribe();
    }

    handleSettingsSubscriber = (next: Settings) => {
        const characters = {
            player: next.player,
            opponent: next.opponent,
        };
        const npc = next.npc;

        this.setState({ characters, npc });
    }

    getResult = () => {
        let result: RESULT_SCORE = "unknown";
        const { kind } = this.props;
        const { apiData, characters: { player: id, opponent: idOpponent } } = this.state;

        if (!apiData || !this.scoreboard) {
            return result;
        }

        const currentKindData: ResultListResponseSingle | undefined = apiData[kind!];
        const score = {
            player: 0,
            opponent: 0,
        };


        if (typeof currentKindData === "undefined") {
            return result;
        }

        const playerData = currentKindData.list[id].data;
        const opponentData = currentKindData.list[idOpponent].data;

        if ("mass" in playerData && "mass" in opponentData) {
            score.player = Number(playerData.mass);
            score.opponent = Number(opponentData.mass);
        } else if ("crew" in playerData && "crew" in opponentData) {
            score.player = Number(playerData.crew);
            score.opponent = Number(opponentData.crew);
        }

        const isValid = !isNaN(score.player) && !isNaN(score.opponent);

        if (isValid) {
            if (score.player > score.opponent) {
                result = "player";
                this.increasePlayerScore(1);
            } else if (score.player === score.opponent) {
                result = "draw";
                this.increasePlayerScore(1);
                this.increaseOpponentScore(1);
            } else if (score.player < score.opponent) {
                result = "opponent";
                this.increaseOpponentScore(1);
            }
        }

        return result;
    }

    increasePlayerScore = (value: number) => {
        const { player } = this.scoreboard;
        this.scoreboard.player = player + value;
    }

    increaseOpponentScore = (value: number) => {
        const { opponent } = this.scoreboard;
        this.scoreboard.opponent = opponent + value;
    }

    getDetailsOfId = (id: number) => {
        const { kind } = this.props;
        const { apiData } = this.state;

        if (!apiData) {
            return undefined;
        }

        const dataKind: ResultListResponseSingle | undefined = apiData[kind];

        if (dataKind === undefined) {
            return undefined;
        }

        const dataOfId = dataKind.list[id - 1];

        if (dataOfId === undefined) {
            return undefined;
        }

        return dataOfId.data;
    }

    setRandomCharacters = () => {
        const { kind } = this.props;
        const { npc } = this.state;

        const { apiData } = this.state;

        if (!apiData || !npc) {
            return;
        }

        const currentKindData: ResultListResponseSingle | undefined = apiData[kind!];

        if (!currentKindData) {
            return;
        }

        if (npc.player) {
            settingsStore.setPlayer(getRandomNumber(1, currentKindData.list.length));
        }
        if (npc.opponent) {
            settingsStore.setOpponent(getRandomNumber(1, currentKindData.list.length));
        }
    }

    handlePlay = () => {
        const { totalMatches } = this.state;
        this.setRandomCharacters();
        this.setState({
            result: this.getResult(),
            totalMatches: totalMatches + 1
        });
    }

    handleReset = () => {
        this.setState({
            characters: {
                player: 0,
                opponent: 0,
            }
        });

        this.scoreboard = {
            player: 0,
            opponent: 0
        };
    }

    render() {
        const { kind } = this.props;
        const {
            apiData,
            apiStatus,
            characters:
                {
                    player: id,
                    opponent: idOpponent
                },
            result,
            totalMatches
        } = this.state;

        if (!apiData) {
            return (<Loading content={!apiStatus ? "You need to reinitialise application" : "Loading…"} />);
        }

        return (
            <Main>
                <TopBar />
                <Container>
                    <Controls
                        kind={kind}
                        scoreboard={this.scoreboard}
                        onPlay={this.handlePlay}
                        onReset={this.handleReset}
                    />
                    <h1 className={styles.helloWorld}>
                        {totalMatches > 0 ? `The winner is ${result}! 🎉` : "Select characters to start 👾"}
                    </h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SelectPlayer
                                type="player"
                                data={apiData}
                                kind={kind}
                                initialValue={id}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectPlayer
                                type="opponent"
                                data={apiData}
                                kind={kind}
                                initialValue={idOpponent}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Details
                                title="player"
                                data={this.getDetailsOfId(id)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Details
                                title="opponent"
                                data={this.getDetailsOfId(idOpponent)}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" align="center">user agent: <span></span></Typography>
                </Container>
            </Main>
        );
    }
}

export default Play;
