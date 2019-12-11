import React from "react";
import { Main } from "../src/layout";
import styles from "./index.scss";
import {Fab, Typography} from "@material-ui/core";
import GamesIcon from "@material-ui/icons/Games";
import {TopBar} from "../src/components";
import Link from "next/link";
import {SwApi} from "../src/dao";
import {ResultListResponse} from "../src/dao/types";

interface HomeProps {
    apiData: ResultListResponse;
}

class Home extends React.Component<HomeProps> {
    static async getInitialProps() {
        try {
            const {resultList: apiData} = await new SwApi().getResults();
            return { apiData };
        } catch (err) {
            console.error("An error has occured", { err });
        }
    }

    componentDidMount() {
        const { apiData } = this.props;

        localStorage.setItem("apiDataSaved", JSON.stringify(apiData));
    }

    render() {
        return (
            <Main>
                <main>
                    <TopBar/>
                    <div className={styles.playWrapper}>
                        <Link href="/play?kind=people" as="/play/people/">
                            <Fab variant="extended">
                                <GamesIcon/>
                                Play
                            </Fab>
                        </Link>
                    </div>
                    <Typography variant="body2" color="textSecondary" align="center">Amadeusz Blanik &copy 2019</Typography>
                </main>
            </Main>
        );
    }
}

export default Home;
