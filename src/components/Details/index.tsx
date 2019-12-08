import React from "react";
import styles from "./styles.scss";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";

class Details extends React.PureComponent {
    render() {
        return(
            <div className={styles.Details}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            asdjkahsd
                        </Typography>
                        <Typography color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Details;
