import React from "react";
import styles from "./styles.scss";
import {Container, Grid, Typography} from "@material-ui/core";
import {SelectKind} from "../index";
import {Scoreboard} from "../../../pages/play";

interface ControlsProps {
    scoreboard: Scoreboard;
}

const Controls: React.FunctionComponent<ControlsProps> = props => {
    const { scoreboard: { player, opponent } } = props;

    return(
        <div className={styles.Controls}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography color="textSecondary">
                            Scoreboard
                        </Typography>
                        <Typography variant="body2" component="p">
                            Player: {player} — Opponent: {opponent}
                        </Typography>
                        <Typography variant="body2" component="p">

                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SelectKind />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Controls;
