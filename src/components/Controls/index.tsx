import React from "react";
import styles from "./styles.scss";
import {Box, Container, Grid} from "@material-ui/core";
import {SelectKind} from "../index";
import {Play} from "./play";

const Controls: React.FunctionComponent = () => {
    return(
        <div className={styles.Controls}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box component="span" m={1}>
                            <Play />
                        </Box>
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
