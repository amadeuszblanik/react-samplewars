import fetch from "isomorphic-unfetch";
import {KIND, PeopleApi, ResultListApi, ResultListItem, ResultListResponse, StarshipApi} from "./types";

class ResultList {
    private kinds: KIND[];

    constructor(kinds: KIND[]) {
        this.kinds = kinds;
    }

    getApiData = async (kind: KIND, page: number) => {
        const results = await fetch(`https://swapi.co/api/${kind}/?page=${page}&format=json`);
        const resultsData: ResultListApi = await results.json();

        return resultsData;
    }

    getResultsOfKind = async (kind: KIND) => {
        let hasNextElement = true;
        let currentPage = 1;
        let resultIndex = 0;
        let length = 0;
        const list: ResultListItem[] = [];

        while (hasNextElement === true) {
            const data = await this.getApiData(kind, currentPage);
            const { next, count, results } = data;

            if (next === null) {
                hasNextElement = false;
            }

            length = count;

            results.forEach((result: PeopleApi | StarshipApi) => {
                list.push({ id: resultIndex, name: result.name});
                resultIndex++;
            });

            currentPage++;
        }

        return {length, list};
    }

    getResults = async () => {
        const { kinds } = this;
        const resultList: ResultListResponse = {};

        for (const kind of kinds) {
            resultList[kind] = await this.getResultsOfKind(kind);
        }

        return { resultList };
    }
}

export default ResultList;
