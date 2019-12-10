import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {KIND} from "../../dao/types";
import {Subscription} from "rxjs";
import {settingsStore} from "../../services";
import {Settings} from "../../services/settings";

interface SelectKindProps {
    list?: KIND[];
}

interface SelectKindState {
    value: KIND;
}

class SelectKind extends React.PureComponent<SelectKindProps, SelectKindState> {
    private settingsSubscriber: Subscription | undefined;

    static defaultProps = {
        list: ["people", "starships"]
    }

    constructor(props: SelectKindProps) {
        super(props);

        this.state = { value: "people" };
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

    handleSettingsSubscriber = (next: Settings) => {
        this.setState({ value: next.kind });
    }

    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { target: { value } } = event;
        settingsStore.setKind(value as KIND);
    }

    renderListItems = () => {
        const { list } = this.props;
        const children: JSX.Element[] = [];

        if (!list) {
            return;
        }

        list.forEach(entry => {
            children.push(<MenuItem value={entry}>{entry}</MenuItem>);
        });

        return children;
    }

    render() {
        const { value } = this.state;
        return(
            <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Select kind of battle</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={this.handleChange}
                >
                    {this.renderListItems()}
                </Select>
            </FormControl>
        );
    }
}

export default SelectKind;
