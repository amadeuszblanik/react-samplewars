import React from "react";
import styles from "./styles.scss";
import {Card, CardContent, Typography} from "@material-ui/core";
import List from "./List";
import {DATA} from "./types";

interface DetailsProps {
    title: "player" | "opponent";
    data?: DATA;
}

const Details: React.FunctionComponent<DetailsProps> = props => {
    const { data, title } = props;

    if (data === undefined) {
        return <></>;
    }

    return(
        <div className={styles.Details}>
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                            Character of {title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <List items={data!} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;
