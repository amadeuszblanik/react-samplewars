import fetch from "isomorphic-unfetch";
import {KIND} from "./types";

const getApiData = async (kind: KIND, id: number, idOpponent: number) => {
    const playerRes = await fetch(`https://swapi.co/api/${kind}/${id}/?format=json`);
    const playerData = await playerRes.json();

    const opponentRes = await fetch(`https://swapi.co/api/${kind}/${idOpponent}/?format=json`);
    const opponentData = await opponentRes.json();

    return { playerData, opponentData };
};

export default getApiData;
