import React from "react";
import { Button } from "@material-ui/core";
import { KIND } from "../../dto";
import { Link } from "../index";
import { settingsStore, useSettings } from "../../services";
import { setCharacter } from "../../utils";

const SelectKind: React.FunctionComponent = () => {
  const { kind } = useSettings();

  const nextKind: KIND = kind === "people" ? "starships" : "people";

  const handleClick = () => {
    settingsStore.setKind(nextKind);
    setCharacter("player", "", NaN);
    setCharacter("opponent", "", NaN);
  };

  return (
    <Link href={`/play?kind=${nextKind}`} as={`/play/${nextKind}`} onClick={handleClick}>
      <Button variant="contained">Switch to {nextKind}</Button>
    </Link>
  );
};

export default SelectKind;
