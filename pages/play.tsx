import React from "react";
import { Main } from "../src/layout";
import styles from "./index.scss";
import {Container, Grid, Typography} from "@material-ui/core";
import {Controls, Details, TopBar} from "../src/components";
import {getApiData} from "../src/dao";
import {KIND, PeopleApi, StarshipApi} from "../src/dao/types";

type API_RESPONSE = PeopleApi | StarshipApi
type SCORE_RESULTS = "WIN" | "LOSE" | "DRAW";

interface HomeProps {
    playerData: API_RESPONSE;
    opponentData: API_RESPONSE;
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
        return await getApiData(kind, id, idOpponent);
    }

    checkResult = () => {
        const { opponentData, playerData } = this.props;

        const score = {
            player: 0,
            opponent: 0
        };

        if ("mass" in playerData && "mass" in opponentData) {
            score.player = Number(playerData.mass);
            score.opponent = Number(opponentData.mass);
        } else if ("crew" in playerData && "crew" in opponentData) {
            score.player = Number(playerData.crew);
            score.opponent = Number(opponentData.crew);
        } else {
            return "DRAW";
        }

        const isAnyNaN = isNaN(score.player) || isNaN(score.opponent);
        const result: SCORE_RESULTS = !isAnyNaN ? score.player > score.opponent ? "WIN" : "LOSE" : "DRAW";

        return result;
    }

    render() {
        const result = this.checkResult();

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
