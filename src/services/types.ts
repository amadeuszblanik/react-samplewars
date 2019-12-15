import { KIND } from "../dto";
import { RESULT_SCORE } from "./settings";

export interface SettingsCharacter {
  id: number;
  points: number;
}

export interface Scoreboard {
  player: number;
  opponent: number;
}

export interface Settings {
  kind: KIND;
  player: SettingsCharacter;
  opponent: SettingsCharacter;
  npc: {
    player: boolean;
    opponent: boolean;
  };
  result: RESULT_SCORE;
  totalMatches: number;
  scoreboard: Scoreboard;
}
