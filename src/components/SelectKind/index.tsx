import React from "react";
import { Button } from "@material-ui/core";
import { KIND } from "../../dto";
import { Link } from "../index";
import {settingsStore} from "../../services";

export interface SelectKindProps {
  kind: KIND;
}

const SelectKind: React.FunctionComponent<SelectKindProps> = props => {
  const { kind } = props;

  const nextKind: KIND = kind === "people" ? "starships" : "people";

  const handleClick = () => {
    settingsStore.setKind(nextKind);
  }

  return (
    <Link href={`/play?kind=${nextKind}`} as={`/play/${nextKind}`} onClick={handleClick}>
      <Button variant="contained">Switch to {nextKind}</Button>
    </Link>
  );
};

export default SelectKind;
