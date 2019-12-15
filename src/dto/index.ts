export type KIND = "people" | "starships";
export type DATA = PeopleApi & StarshipApi;
export type DATA_ARRAY = PeopleApi[] & StarshipApi[];

export interface PeopleApi {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: "female" | "male";
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface StarshipApi {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credists: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface ResultApi {
  count: number;
  next: string;
  previous: string;
  results: DATA[];
}

export interface ResultListItem {
  id: number;
  data: DATA;
}

export interface ResultListResponseSingle {
  length: number;
  list: ResultListItem[];
}

export type ResultListResponse = {
  [key in KIND]?: ResultListResponseSingle;
};

export type CacheApi = { [key: string]: any };
