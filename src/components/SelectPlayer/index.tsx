import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {KIND, ResultListItem, ResultListResponse, ResultListResponseSingle} from "../../dao/types";
import {settingsStore} from "../../services";
import {Subscription} from "rxjs";
import {Settings} from "../../services/settings";

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

    renderListItems = () => {
        const { data } = this.props;
        const { kind } = this.state;
        const dataKind: ResultListResponseSingle | undefined = data[kind!];
        const list: ResultListItem[] = typeof dataKind !== "undefined" ? dataKind.list : [];
        const children: JSX.Element[] = [];

        if (!list) {
            return children;
        }

        list.forEach((entry: ResultListItem) => {
            children.push(<MenuItem key={entry.id} value={entry.id}>{entry.data.name}</MenuItem>);
        });
        return children;
    }

    render() {
        const { type } = this.props;
        const { id } = this.state;
        return(
            <FormControl style={{ width: "100%" }}>
                <InputLabel id={`select-player-label_${type}`}>Select player for {type}</InputLabel>
                <Select
                    labelId={`select-player-label_${type}`}
                    id={`select-player-${type}`}
                    value={id}
                    onChange={this.handleChange}
                >
                    <MenuItem value={0} disabled>-- Select character --</MenuItem>
                    {this.renderListItems()}
                </Select>
            </FormControl>
        );
    }
}

export default SelectPlayer;
