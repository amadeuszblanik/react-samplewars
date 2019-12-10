import React from "react";
import { Main } from "../src/layout";
import styles from "./index.scss";
import {Container, Grid, Typography} from "@material-ui/core";
import {Controls, Details, TopBar, SelectPlayer} from "../src/components";
import {KIND, ResultListResponse, ResultListResponseSingle} from "../src/dao/types";
import {scoreboardStore} from "../src/services";

type RESULT_SCORE = "player" | "opponent" | "draw";

interface PlayProps {
    id: number;
    idOpponent: number;
    kind: KIND;
}

interface PlayState {
    apiData: ResultListResponse | false;
    currentResult: RESULT_SCORE;
}

interface HomeGetInitialProps {
    query: {
        kind: KIND;
        id: number;
        idOpponent: number;
    };
    req: any;
}

class Play extends React.Component<PlayProps, PlayState> {
    constructor(props: PlayProps) {
        super(props);

        this.state = { apiData: false, currentResult: "draw" };
    }

    static async getInitialProps({ query: { kind, id, idOpponent } }: HomeGetInitialProps) {
        return { id, idOpponent, kind };
    }

    componentDidMount() {
        const apiDataInLocalStorage = localStorage.getItem("apiDataSaved");

        if (!apiDataInLocalStorage) {
            throw new Error("No api data in localStorage!");
        }

        this.setState({ apiData: JSON.parse(apiDataInLocalStorage) });

        const result: RESULT_SCORE = this.getResult();

        if (result === "player") {
            scoreboardStore.addPointPlayer();
        } else if (result === "opponent") {
            scoreboardStore.addPointOpponent();
        } else if (result === "draw") {
            scoreboardStore.addPointDraw();
        }

        this.setState({ currentResult: result });
    }

    getResult = () => {
        const { kind, id, idOpponent } = this.props;
        const { apiData } = this.state;

        if (!apiData) {
            console.warn('no data api');
            return "draw";
        }

        const currentKindData: ResultListResponseSingle | undefined = apiData[kind!];

        const score = {
            player: 0,
            opponent: 0
        };

        if (typeof currentKindData === "undefined") {
            return "draw";
        }

        const playerData = currentKindData.list[id].data;
        const opponentData = currentKindData.list[idOpponent].data;

        if ("mass" in playerData && "mass" in opponentData) {
            score.player = Number(playerData.mass);
            score.opponent = Number(opponentData.mass);
        } else if ("crew" in playerData && "crew" in opponentData) {
            score.player = Number(playerData.crew);
            score.opponent = Number(opponentData.crew);
        } else {
            return "draw";
        }

        const isAnyNaN: boolean = isNaN(score.player) || isNaN(score.opponent);
        const result: RESULT_SCORE = !isAnyNaN ? score.player >= score.opponent ? score.player !== score.opponent ? "player" : "draw" : "opponent" : "draw";

        return result;
    }

    render() {
        const { kind, id, idOpponent } = this.props;
        const { apiData } = this.state;

        if (!apiData) {
            return (<>You need to init app first</>);
        }

        const result: RESULT_SCORE = this.getResult();
        const currentKindData: ResultListResponseSingle | undefined = apiData[kind!];

        console.log("Play(render)::", { currentKindData });

        return (
            <Main>
                <TopBar />
                <Container>
                    <Controls />
                    <h1 className={styles.helloWorld}>You {result}</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SelectPlayer type="player" list={typeof currentKindData !== "undefined" ? currentKindData.list : []} initialValue={id} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectPlayer type="opponent" list={typeof currentKindData !== "undefined" ? currentKindData.list : []} initialValue={idOpponent} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Details/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Details/>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" align="center">user agent: <span></span></Typography>
                </Container>
            </Main>
        );
    }
}

export default Play;
