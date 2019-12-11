import React from "react";
import styles from "./styles.scss";
import {Card, CardContent, Typography} from "@material-ui/core";
import {PeopleApi, StarshipApi} from "../../dto";
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
                <div key={key}>
                    <Typography color="textSecondary">
                        {TRANSLATIONS[key]}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {value}
                    </Typography>
                </div>
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
                </Card>
            </div>
        );
    }
}

export default Details;
