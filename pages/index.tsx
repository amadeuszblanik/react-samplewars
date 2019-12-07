import React from "react";
import {Main} from "../src/layout";
import styles from "./index.scss";
import { NextPage } from "next";

interface HomeProps {
    userAgent: string
}

const Home: NextPage<HomeProps> = props => {
    const { userAgent } = props;

    return (
        <Main>
            <main>
                <h1 className={styles.helloWorld}>Hello world!</h1>
                <p>user agent: {userAgent}</p>
            </main>
        </Main>
    )
};

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
    return { userAgent };
};

export default Home;
