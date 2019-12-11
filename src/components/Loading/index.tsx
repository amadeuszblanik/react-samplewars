import React from "react";
import {Button, Container, Typography} from "@material-ui/core";
import * as styles from "./styles.scss";
import {Main} from "../../layout";
import {Link, TopBar} from "../index";

interface LoadingProps {
    content?: string;
}

const Loading: React.FunctionComponent<LoadingProps> = props => {
    const { content } = props;

    return(
        <Main>
            <TopBar />
            <Container>
                <div className={styles.Loading}>
                    <div className={styles.Content}>
                        <Typography variant="h5" color="textSecondary" align="center">{content}</Typography>
                    </div>
                    <Link href="/" >
                        <Button variant="contained">Restart</Button>
                    </Link>
                </div>
            </Container>
        </Main>
    );
};

Loading.defaultProps = {
    content: "Loading…"
};

export default Loading;