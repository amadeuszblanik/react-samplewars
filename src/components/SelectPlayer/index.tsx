import React from "react";
import {FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch} from "@material-ui/core";
import {KIND, ResultListItem, ResultListResponse, ResultListResponseSingle} from "../../dto";
import {settingsStore} from "../../services";
import {getRandomNumber} from "../../utils";

export interface SelectPlayerProps {
    type: "player" | "opponent";
    data: ResultListResponse;
    initialValue: number;
    kind: KIND;
}

interface SelectPlayerState {
    id: number;
    npc: boolean;
}

class SelectPlayer extends React.PureComponent<SelectPlayerProps, SelectPlayerState> {
    constructor(props: SelectPlayerProps) {
        super(props);
        const { initialValue } = props;

        this.state = {
            id: initialValue,
            npc: true,
        };
    }

    componentDidMount() {
        this.randomiseCharacter();
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

    getListCurrentKind = () => {
        const { data, kind } = this.props;
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
        const { npc } = this.state;

        if (!npc) {
            const list: ResultListItem[] = this.getListCurrentKind();

            if (!list) {
                return;
            }

            this.setState({id: getRandomNumber(1, list.length)});
        }
    }

    handleRandom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { type } = this.props;
        const { target: checked } = event;
        this.randomiseCharacter();
        if (type === "player") {
            settingsStore.setPlayerNPC(checked.checked);
        } else if (type === "opponent") {
            settingsStore.setOpponentNPC(checked.checked);
        }

        this.setState({ npc: checked.checked });
    }

    render() {
        const { type } = this.props;
        const { id, npc } = this.state;
        return(
            <FormControl style={{ width: "100%" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <InputLabel id={`select-player-label_${type}`}>Select character for {type}</InputLabel>
                        <Select
                            labelId={`select-player-label_${type}`}
                            id={`select-player_${type}`}
                            value={id}
                            onChange={this.handleChange}
                            style={{ width: "100%" }}
                            disabled={ npc }
                        >
                            <MenuItem value={0} disabled>-- Select character --</MenuItem>
                            {this.renderListItems()}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControlLabel
                            control={
                                <Switch checked={npc} onChange={this.handleRandom} />
                            }
                            label="NPC"
                        />
                    </Grid>
                </Grid>
            </FormControl>
        );
    }
}

export default SelectPlayer;
