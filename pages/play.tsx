import React from "react";
import { Main } from "../src/layout";
import styles from "./index.scss";
import {Container, Grid, Typography} from "@material-ui/core";
import {Controls, Details, TopBar, SelectPlayer, Loading} from "../src/components";
import {KIND, ResultListResponse, ResultListResponseSingle} from "../src/dao/types";
import {Subscription} from "rxjs";
import {settingsStore} from "../src/services";
import {Settings} from "../src/services/settings";

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
            }
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
        this.setState({ characters });
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

    render() {
        const { apiData, apiStatus, characters: { player: id, opponent: idOpponent } } = this.state;

        if (!apiData) {
            return (<Loading content={!apiStatus ? "You need to reinitialise application" : "Loading…"} />);
        }

        const result: RESULT_SCORE = this.getResult();

        return (
            <Main>
                <TopBar />
                <Container>
                    <Controls scoreboard={this.scoreboard} />
                    <h1 className={styles.helloWorld}>The winner is {result}! 🎉</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SelectPlayer type="player" data={apiData} initialValue={id} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectPlayer type="opponent" data={apiData} initialValue={idOpponent} />
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
