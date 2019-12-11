import React from "react";
import styles from "./styles.scss";
import {Button, Grid, Typography} from "@material-ui/core";
import {SelectKind} from "../index";
import {Scoreboard} from "../../../pages/play";

interface ControlsProps {
    scoreboard: Scoreboard;
    onPlay: () => void;
    onReset: () => void;
}

const Controls: React.FunctionComponent<ControlsProps> = props => {
    const { scoreboard: { player, opponent }, onPlay, onReset } = props;

    return(
        <div className={styles.Controls}>
            <Grid container spacing={3}>
                <Grid item xs={4} md={4}>
                    <Button className={styles.Play} variant="contained" color="primary" onClick={onPlay}>
                        🔫 Battle
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onReset}>
                        Reset
                    </Button>
                </Grid>
                <Grid item xs={8} md={4}>
                    <Typography color="textSecondary">
                            Scoreboard
                    </Typography>
                    <Typography variant="body2" component="p">
                            Player: {player} — Opponent: {opponent}
                    </Typography>
                    <Typography variant="body2" component="p">

                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <SelectKind />
                </Grid>
            </Grid>
        </div>
    );
};

export default Controls;
