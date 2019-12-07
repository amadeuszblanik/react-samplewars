import React from "react";
import styles from "./styles.scss";
import {Box, Button, Container, Grid, Typography} from "@material-ui/core";
import {Form} from "./Form";

class Controls extends React.PureComponent {
    render() {
        return(
            <div className={styles.Controls}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}  lg={4}>
                            <Box component="span" m={1}>
                                <Button variant="contained" color="secondary">
                                    New battle ⚔️
                                </Button>
                            </Box>
                            <Box component="span" m={1}>
                                <Button variant="contained">
                                    Reset 🧹
                                </Button>
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
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Controls;
