import React from "react";
import styles from "./styles.scss";
import { Card, CardContent, Typography } from "@material-ui/core";
import List from "./List";
import { withSettings } from "../../services";
import { getDetailsOfId } from "../../utils";
import { InjectedWithSettingsProps } from "../../services/withSettings";
import { ResultListResponse } from "../../dto";
import { TYPE } from "../SelectCharacter";

interface DetailsProps extends InjectedWithSettingsProps {
  type: TYPE;
  data: ResultListResponse;
}

const Details: React.FunctionComponent<DetailsProps> = props => {
  const {
    data,
    type,
    settings: {
      kind,
      player: { id },
      opponent: { id: idOpponent },
    },
  } = props;

  const currentId = type === "player" ? id : idOpponent;

  const dataCurrent = getDetailsOfId(data, currentId, kind);

  if (dataCurrent === undefined) {
    return <></>;
  }

  return (
    <div className={styles.Details}>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Character of {type}
          </Typography>
          <Typography variant="h5" component="h2">
            {dataCurrent.name}
          </Typography>
          <List items={dataCurrent!} />
        </CardContent>
      </Card>
    </div>
  );
};

export default withSettings(Details);
