import React from "react";
import {createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme} from "@material-ui/core";
import {optionsService} from "../../services";

interface FormProps {
    values: string[];
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

export const FormKind: React.FunctionComponent<FormProps> = props => {
    const { values } = props;
    const classes = useStyles();

    const [kind, setKind] = React.useState("");

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { target: { value } } = event;
        optionsService.setOption("kind", value);
        setKind(value as string);
    };

    const makeChildren = () => {
        const children: JSX.Element[] = [];

        for(const value of values) {
            children.push(<MenuItem value={value}>{value}</MenuItem>);
        }

        return children;
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="options-kind-war-label">Set kind of battle</InputLabel>

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
