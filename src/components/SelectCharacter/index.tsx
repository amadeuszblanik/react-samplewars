import React from "react";
import {withSettings} from "../../services";
import { InjectedWithSettingsProps } from "../../services/withSettings";
import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";
import { ResultListResponse } from "../../dto";
import { getCurrentList, getPoints, setCharacter } from "../../utils";

export type TYPE = "player" | "opponent";

export interface SelectCharacterProps extends InjectedWithSettingsProps {
  type: TYPE;
  data: ResultListResponse;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export const SelectCharacter: React.FunctionComponent<SelectCharacterProps> = props => {
  const classes = useStyles();
  const {
    settings: { kind },
    data,
    type,
  } = props;
  const [selectedItem, setSelectedItem] = React.useState("");

  const currentList = getCurrentList(data, kind);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;
    setSelectedItem(value as string);

    const points = (value as string) === "" ? NaN : getPoints(currentList[value as number].data, kind);
    setCharacter(type, value, points);
  };

  const children = currentList.map(entry => (
    <MenuItem key={entry.id} value={entry.id}>
      {entry.data.name}
    </MenuItem>
  ));

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={`select-character-label_${type}`}>Select character of {type}</InputLabel>
      <Select
        labelId={`select-character-label_${type}`}
        id={`select-character_${type}`}
        value={selectedItem}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Random (NPC)</em>
        </MenuItem>
        {children}
      </Select>
    </FormControl>
  );
};

export default withSettings(SelectCharacter);
