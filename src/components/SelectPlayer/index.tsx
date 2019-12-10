import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {ResultListItem} from "../../dao/types";
import {settingsStore} from "../../services";

interface SelectPlayerProps {
    type: "player" | "opponent";
    list: ResultListItem[];
    initialValue: number;
}

interface SelectPlayerState {
    id: number;
}

class SelectPlayer extends React.PureComponent<SelectPlayerProps, SelectPlayerState> {
    constructor(props: SelectPlayerProps) {
        super(props);
        const { initialValue } = props;

        this.state = {
            id: initialValue,
        };
    }

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
        const { list } = this.props;
        const children: JSX.Element[] = [];
        list.forEach((entry: ResultListItem) => {
            children.push(<MenuItem value={entry.id}>{entry.data.name}</MenuItem>);
        });
        return children;
    }

    render() {
        const { type } = this.props;
        const { id } = this.state;
        return(
            <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Select player for {type}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
