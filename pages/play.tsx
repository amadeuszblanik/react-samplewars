import React from "react";
import { Main } from "../src/layout";
import styles from "./index.scss";
import {Container, Grid, Typography} from "@material-ui/core";
import {Controls, Details, TopBar} from "../src/components";
import {KIND, ResultListResponse, ResultListResponseSingle} from "../src/dao/types";
import { SwApi } from "../src/dao/";

type RESULT_SCORE = "WIN" | "LOSE" | "DRAW";

interface HomeProps {
    apiData: ResultListResponse;
    id: number;
    idOpponent: number;
    kind: KIND;
}

interface HomeGetInitialProps {
    query: {
        kind: KIND;
        id: number;
        idOpponent: number;
    };
    req: any;
}

class Play extends React.Component<HomeProps, any> {
    static async getInitialProps({ query: { kind, id, idOpponent } }: HomeGetInitialProps) {
        const { resultList: apiData } = await new SwApi().getResults();
        return { apiData, id, idOpponent, kind };
    }

    getResult = () => {
        const { apiData, kind, id, idOpponent } = this.props;
        const currentKindData: ResultListResponseSingle | undefined = apiData[kind!]

        const score = {
            player: 0,
            opponent: 0
        };

        if (typeof currentKindData === "undefined") {
            return "DRAW";
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
            return "DRAW";
        }

        const isAnyNaN: boolean = isNaN(score.player) || isNaN(score.opponent);
        const result: RESULT_SCORE = !isAnyNaN ? score.player >= score.opponent ? score.player !== score.opponent ? "WIN" : "DRAW" : "LOSE" : "DRAW";

        return result;
    }

    render() {
        const { apiData, kind } = this.props;
        const result: RESULT_SCORE = this.getResult();
        const currentKindData: ResultListResponseSingle | undefined = apiData[kind!]

        console.log("Play(render)::", { currentKindData });

        return (
            <Main>
                <TopBar />
                <Container>
                    <Controls />
                    <h1 className={styles.helloWorld}>You {result}</h1>
                    <Grid container spacing={3}>
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
