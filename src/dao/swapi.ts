import fetch from "isomorphic-unfetch";
import {KIND, ResultApi, ResultListItem, ResultListResponse} from "./types";

const BASE_URL = "https://swapi.co/api/";

class SwApi {
    private kinds: KIND[];

    constructor(kinds: KIND[] = ["people", "starships"]) {
        this.kinds = kinds;
    }

    fetchData = async (kind: KIND, page: number) => {
        const results = await fetch(`${BASE_URL}${kind}/?page=${page}&format=json`);
        const resultsData: ResultApi = await results.json();

        return resultsData;
    }

    getResultsOfKind = async (kind: KIND) => {
        let hasNextElement = true,
            currentPage = 1,
            resultIndex = 0,
            length = 0;
        const list: ResultListItem[] = [];

        while (hasNextElement) {
            const data = await this.fetchData(kind, currentPage);
            const { next, count, results } = data;

            length = count;

            for (const result of results) {
                list.push({ id: resultIndex, data: result });
                resultIndex++;
            }

            if (next === null) {
                hasNextElement = false;
            }

            currentPage++;
        }

        return {length, list};
    }

    getResults = async () => {
        const resultList: ResultListResponse = {};

        for (const kind of this.kinds) {
            resultList[kind] = await this.getResultsOfKind(kind);
        }

        return { resultList };
    }
}

export default SwApi;
