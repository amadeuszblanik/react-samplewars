import React from "react";
import {createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme} from "@material-ui/core";

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

export const Form: React.FunctionComponent = () => {
    const classes = useStyles();

    const [kind, setKind] = React.useState("");

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setKind(event.target.value as string);
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
                <MenuItem value="people">People</MenuItem>
                <MenuItem value="ships">Starship</MenuItem>
            </Select>
        </FormControl>
    );
};
