import React from "react";
import styles from "./styles.scss";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {API_RESPONSE} from "../../dao/types";

interface DetailsProps {
    title: "Player" | "Opponent";
    data: API_RESPONSE;
}

const KEYS_TRANSLATIONS: { [key: string]: string } = {
    name: "Name",
    model: "Model",
    manufacturer: "Manufacturer",
    // eslint-disable-next-line @typescript-eslint/camelcase
    cost_in_credits: "Price",
    length: "Length",
    // eslint-disable-next-line @typescript-eslint/camelcase
    max_atmosphering_speed: "Max atmosphering speed",
    crew: "Crew",
    passengers: "Passengers",
    // eslint-disable-next-line @typescript-eslint/camelcase
    cargo_capacity: "Cargo capacity",
    consumables: "Consumables",
    // eslint-disable-next-line @typescript-eslint/camelcase
    hyperdrive_rating: "Hyperdrive rating",
    MGLT: "Megalight",
    // eslint-disable-next-line @typescript-eslint/camelcase
    starship_class: "Starship class",
    pilots: "Pilots",
    films: "Movies",
    created: "Created",
    edited: "Last edit",
    url: "Data source"
};

class Details extends React.PureComponent<DetailsProps> {
    renderDetails = () => {
        const { data } = this.props;
        const responseJSX: JSX.Element[] = [];


        Object.entries(data).forEach(
            ([key, value]) => {
                if (key === "name") {
                    return;
                }
                responseJSX.push(<Typography variant="body2" component="p">{KEYS_TRANSLATIONS[key] ? KEYS_TRANSLATIONS[key] : key}: {value}</Typography>);
            }
        );

        return responseJSX;
    }

    render() {
        const { title, data } = this.props;

        return(
            <div className={styles.Details}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {data.name}
                        </Typography>
                        {this.renderDetails()}
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
