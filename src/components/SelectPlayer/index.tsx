import React from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import {KIND, ResultListItem, ResultListResponse, ResultListResponseSingle} from "../../dao/types";
import {settingsStore} from "../../services";
import {Subscription} from "rxjs";
import {Settings} from "../../services/settings";
import {getRandomNumber} from "../../utils";

interface SelectPlayerProps {
    type: "player" | "opponent";
    data: ResultListResponse;
    initialValue: number;
}

interface SelectPlayerState {
    id: number;
    kind: KIND;
}

class SelectPlayer extends React.PureComponent<SelectPlayerProps, SelectPlayerState> {
    private settingsSubscriber: Subscription | undefined;

    constructor(props: SelectPlayerProps) {
        super(props);
        const { initialValue } = props;

        this.state = {
            id: initialValue,
            kind: "people",
        };
    }

    componentDidMount() {
        this.settingsSubscriber = settingsStore.subscription().subscribe(this.handleSettingsSubscriber);
    }

    componentWillUnmount() {
        if (this.settingsSubscriber === undefined) {
            return;
        }

        this.settingsSubscriber.unsubscribe();
    }

    handleSettingsSubscriber = (next: Settings) => this.setState({ kind: next.kind });

    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { type } = this.props;
        const { target: { value } } = event;
        if (type === "player") {
            settingsStore.setPlayer(value as number);
        } else if (type === "opponent") {
            settingsStore.setOpponent(value as number);
        }
        this.setState({ id: value as number });
    }

    getListCurrentKind = () => {
        const { data } = this.props;
        const { kind } = this.state;
        const dataKind: ResultListResponseSingle | undefined = data[kind!];
        return typeof dataKind !== "undefined" ? dataKind.list : [];
    }

    renderListItems = () => {
        const list: ResultListItem[] = this.getListCurrentKind();
        const children: JSX.Element[] = [];

        if (!list) {
            return children;
        }

        list.forEach((entry: ResultListItem) => {
            children.push(<MenuItem key={entry.id} value={entry.id}>{entry.data.name}</MenuItem>);
        });
        return children;
    }

    randomiseCharacter = () => {
        const list: ResultListItem[] = this.getListCurrentKind();

        if (!list) {
            return;
        }

        this.setState({ id: getRandomNumber(1, list.length) });
    }

    render() {
        const { type } = this.props;
        const { id } = this.state;
        return(
            <FormControl style={{ width: "100%" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <InputLabel id={`select-player-label_${type}`}>Select player for {type}</InputLabel>
                        <Select
                            labelId={`select-player-label_${type}`}
                            id={`select-player-${type}`}
                            value={id}
                            onChange={this.handleChange}
                            style={{ width: "100%" }}
                        >
                            <MenuItem value={0} disabled>-- Select character --</MenuItem>
                            {this.renderListItems()}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button color="primary" onClick={this.randomiseCharacter}>
                            Random
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        );
    }
}

export default SelectPlayer;
