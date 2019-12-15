import { DATA, KIND } from "../dto";

export const getPoints = (data: DATA, kind: KIND) => {
  if (kind === "people") {
    return Number(data.mass);
  } else if (kind === "starships") {
    return Number(data.crew);
  }

  return NaN;
};
