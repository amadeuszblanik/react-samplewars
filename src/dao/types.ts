export type KIND = "people" | "starships";

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
    created: Date;
    edited: Date;
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
    created: Date;
    edited: Date;
    url: string;
}

export interface ResultListApi {
    count: number;
    next: string;
    previous: string;
    results: PeopleApi[] | StarshipApi[];
}

export interface ResultListItem {
    id: number;
    name: string;
}

export interface ResultListResponseSingle {
    length: number;
    list: ResultListItem[];
}

export type ResultListResponse = {
    [key in KIND]?: ResultListResponseSingle;
}

export type API_RESPONSE = PeopleApi | StarshipApi;
