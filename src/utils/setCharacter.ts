import { settingsStore } from "../services";
import { TYPE } from "../components/SelectCharacter";

export const setCharacter = (type: TYPE, value: unknown, points: number, changeNPCstate = true) => {
  if (typeof value !== "number") {
    if (type === "player") {
      settingsStore.setPlayerNPC(true);
    } else if (type === "opponent") {
      settingsStore.setOpponentNPC(true);
    }
    return;
  }

  if (type === "player") {
    settingsStore.setPlayer(value, Number(points));
    changeNPCstate && settingsStore.setPlayerNPC(false);
  } else if (type === "opponent") {
    settingsStore.setOpponent(value, Number(points));
    changeNPCstate && settingsStore.setOpponentNPC(false);
  }
};
