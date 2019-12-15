import React from "react";
import { Button } from "@material-ui/core";
import { KIND } from "../../dto";
import { Link } from "../index";
import { useSettings } from "../../services";

const SelectKind: React.FunctionComponent = () => {
  const { kind } = useSettings();

  const nextKind: KIND = kind === "people" ? "starships" : "people";

  return (
    <Link href={`/play?kind=${nextKind}`} as={`/play/${nextKind}`}>
      <Button variant="contained">Switch to {nextKind}</Button>
    </Link>
  );
};

export default SelectKind;
