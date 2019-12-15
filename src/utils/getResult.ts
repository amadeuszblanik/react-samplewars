import { Scoreboard } from "../services/types";
import { settingsStore } from "../services";

export const getResult = (points: Scoreboard, scoreboard: Scoreboard) => {
  const { player: valuePlayer, opponent: valueOpponent } = points;
  const { player, opponent } = scoreboard;
  const isAnyNaN = isNaN(valuePlayer) || isNaN(valueOpponent);

  if (isAnyNaN) {
    return "unknown";
  }

  console.debug({ valuePlayer, valueOpponent });

  if (valuePlayer > valueOpponent) {
    console.log("Player");
    settingsStore.setScoreboard({ player: player + 1, opponent });
    return "player";
  } else if (valuePlayer === valueOpponent) {
    console.log("Draw");
    settingsStore.setScoreboard({ player: player + 1, opponent });
    settingsStore.setScoreboard({ player: player, opponent: opponent + 1 });
    return "draw";
  } else if (valuePlayer < valueOpponent) {
    console.log("Opponent");
    settingsStore.setScoreboard({ player: player, opponent: opponent + 1 });
    return "opponent";
  }
  return "unknown";
};
