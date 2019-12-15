import React from "react";
import { Button } from "@material-ui/core";
import { Scoreboard } from "../../services/types";
import { settingsStore, withSettings } from "../../services";
import { getPoints, getRandomNumber, getResult, setCharacter } from "../../utils";
import { InjectedWithSettingsProps } from "../../services/withSettings";
import { ResultListResponseSingle } from "../../dto";

interface PlayProps extends InjectedWithSettingsProps {
  data?: ResultListResponseSingle;
}

const handlePlay = (matches: number, id: Scoreboard, points: Scoreboard, scoreboard: Scoreboard) => () => {
  settingsStore.setTotalMatches(matches + 1);
  settingsStore.setResult(getResult(points, scoreboard));
  setCharacter("player", id.player, points.player, false);
  setCharacter("opponent", id.opponent, points.opponent, false);
};

const Controls: React.FunctionComponent<PlayProps> = props => {
  const {
    data,
    settings: {
      scoreboard,
      npc: { player: npcPlayer, opponent: npcOpponent },
      totalMatches,
    },
  } = props;

  let {
    settings: {
      player: { id },
      opponent: { id: idOpponent },
    },
  } = props;

  if (!data) {
    return <>Error</>;
  }

  id = !npcPlayer ? id : getRandomNumber(0, data.list.length - 1);
  idOpponent = !npcOpponent ? idOpponent : getRandomNumber(0, data.list.length - 1);

  const points: Scoreboard = {
    player: getPoints(data.list[id].data),
    opponent: getPoints(data.list[idOpponent].data),
  };

  const ids = {
    player: id,
    opponent: idOpponent,
  };

  return (
    <Button
      id="button_play"
      variant="contained"
      color="primary"
      onClick={handlePlay(totalMatches, ids, points, scoreboard)}
    >
      🔫 Battle
    </Button>
  );
};

export default withSettings(Controls);
