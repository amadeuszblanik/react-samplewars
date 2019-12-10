import React from "react";
import styles from "./styles.scss";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {PeopleApi, StarshipApi} from "../../dao/types";
import {forEachObject} from "../../utils";
import {TRANSLATIONS} from "./translations";

type DATA = PeopleApi | StarshipApi | undefined;

interface DetailsProps {
    title: "player" | "opponent";
    data: DATA | undefined;
}

class Details extends React.PureComponent<DetailsProps> {
    renderChildren() {
        const { data } = this.props;
        const children: JSX.Element[] = [];

        if (!data) {
            return children;
        }

        { forEachObject(data, (key, value) => {
            if (key === "name") {
                return;
            }

            children.push(
                <Typography variant="body2" component="p">
                    {TRANSLATIONS[key]}: {value}
                </Typography>
            );
        }); }

        return children;
    }

    render() {
        const { data, title } = this.props;

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
                        {this.renderChildren()}
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
