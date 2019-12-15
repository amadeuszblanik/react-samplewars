import { PeopleApi, StarshipApi } from "../dto";

export const getPoints = (data: PeopleApi | StarshipApi) => {
  if ("mass" in data) {
    return Number(data.mass);
  }
  if ("crew" in data) {
    return Number(data.crew);
  }

  return NaN;
};
