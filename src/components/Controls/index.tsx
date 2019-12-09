import React from "react";
import styles from "./styles.scss";
import {Box, Button, Container, Grid, Typography} from "@material-ui/core";
import {FormKind} from "./FormKind";
import {KIND, ResultListItem, ResultListResponse} from "../../dao/types";
import {optionsService} from "../../services";
import {FormId} from "./FormId";
import Link from "next/link";

interface ControlsProps {
    list: ResultListResponse;
}

interface ControlsState {
    kind: KIND;
    playerId: number;
    opponentId: number;
}

class Controls extends React.PureComponent<ControlsProps, ControlsState> {
    private optionSubscription: any;

    constructor(props: ControlsProps) {
        super(props);

        this.state = { kind: "people", playerId: 1, opponentId: 2 };
    }

    componentDidMount() {
        this.optionSubscription = optionsService.getOptions().subscribe(this.handleOptionSubscription);
    }

    componentWillUnmount() {
        this.optionSubscription.unsubscribe();
    }

    // @ts-ignore
    handleOptionSubscription = next => {
        const { kind, playerId, opponentId } = next.state;
        this.setState({ kind, playerId, opponentId });
        this.forceUpdate();
    }

    render() {
        const { list } = this.props;
        const { kind, playerId, opponentId } = this.state;
        // @ts-ignore
        const selectedList: ResultListItem[] = list[kind!].list;
        const battleLink = {
            href: `/play?kind=${kind}&id=${playerId}&idOpponent=${opponentId}`,
            as: `/play/${kind}/${playerId}/${opponentId}`
        }

        return(
            <div className={styles.Controls}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}  lg={4}>
                            <Box component="span" m={1}>
                                <Link href={battleLink.href} as={battleLink.as}>
                                    <Button variant="contained" color="secondary">
                                        New battle ⚔️
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Box component="span" m={1}>
                                <Typography display="inline" variant="body2">
                                    Wins: <span>#</span>
                                </Typography>
                            </Box>
                            <Box component="span" m={1}>
                                <Typography display="inline" variant="body2">
                                    Loss: <span>#</span>
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}  lg={4}>
                            <FormKind values={Object.keys(list)} />
                            <FormId list={selectedList} type="playerId" />
                            <FormId list={selectedList} type="opponentId" />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Controls;
