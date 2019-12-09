import React from "react";
import {createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme} from "@material-ui/core";
import {ResultListItem} from "../../dao/types";
import {optionsService} from "../../services";

interface FormProps {
    type: "playerId" | "opponentId";
    list: ResultListItem[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export const FormId: React.FunctionComponent<FormProps> = props => {
    const { list, type } = props;
    const classes = useStyles();

    const [kind, setKind] = React.useState("");

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { target: { value } } = event;
        optionsService.setOption(type, value);
        setKind(value as string);
    };

    const makeChildren = () => {
        const children: JSX.Element[] = [];

        for(const listItem of list) {
            children.push(<MenuItem value={listItem.id}>{listItem.name}</MenuItem>);
        }

        return children;
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="options-kind-war-label">Set {type}</InputLabel>

            <Select
                labelId="options-kind-war-label"
                id="options-kind-war-select"
                value={kind}
                onChange={handleChange}
            >
                {makeChildren()}
            </Select>
        </FormControl>
    );
};
