import React from "react";
import styles from "./styles.scss";
import {Box, Container, Grid, Typography} from "@material-ui/core";
import {scoreboardStore} from "../../services";
import {Scoreboard} from "../../services/scoreboard";
import {Subscription} from "rxjs";
import {SelectKind} from "../index";
import {Play} from "./play";

interface ControlsState {
    player: number;
    opponent: number;
}

class Controls extends React.PureComponent<{}, ControlsState> {
    private scoreboardSubscription: Subscription | undefined;

    constructor(props: {}) {
        super(props);

        this.state = {
            player: 0,
            opponent: 0,
        };
    }

    componentDidMount() {
        this.scoreboardSubscription = scoreboardStore.subscription().subscribe(this.handleScoreboardSubscription);
    }

    componentWillUnmount() {
        if (this.scoreboardSubscription === undefined) {
            return;
        }

        this.scoreboardSubscription.unsubscribe();
    }

    handleScoreboardSubscription = (next: Scoreboard) => {
        const { player, opponent } = next;
        this.setState({ player, opponent });
    }

    render() {
        const { player, opponent } = this.state;
        return(
            <div className={styles.Controls}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}  lg={4}>
                            <Box component="span" m={1}>
                                <Play />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box component="span" m={1}>
                                <Typography display="inline" variant="body2">
                                    Player: <span>{player}</span>
                                </Typography>
                            </Box>
                            <Box component="span" m={1}>
                                <Typography display="inline" variant="body2">
                                    Opponent: <span>{opponent}</span>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}  lg={4}>
                            <SelectKind />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Controls;
