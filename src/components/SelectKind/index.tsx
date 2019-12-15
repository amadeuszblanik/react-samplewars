import React from "react";
import { Button } from "@material-ui/core";
import { KIND } from "../../dto";
import { Link } from "../index";

export interface SelectKindProps {
  kind: KIND;
}

const SelectKind: React.FunctionComponent<SelectKindProps> = props => {
  const { kind } = props;

  const nextKind: KIND = kind === "people" ? "starships" : "people";

  return (
    <Link href={`/play?kind=${nextKind}`} as={`/play/${nextKind}`}>
      <Button variant="contained">Switch to {nextKind}</Button>
    </Link>
  );
};

export default SelectKind;
