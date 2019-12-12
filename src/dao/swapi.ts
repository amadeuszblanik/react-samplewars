import fetch from "isomorphic-unfetch";
import {KIND, CacheApi, ResultApi, ResultListItem, ResultListResponse} from "../dto";
import {forEachObject} from "../utils";

const BASE_URL = "https://swapi.co/api/";

class SwApi {
    private kinds: KIND[];
    private cache: CacheApi = {};

    constructor(kinds: KIND[] = ["people", "starships"]) {
        this.kinds = kinds;
    }

    http = async (url: string) => {
        const results = await fetch(`${url}`);
        return await results.json();
    }

    fetchData = async (kind: KIND, page: number) => {
        const resultsData: ResultApi = await this.http(`${BASE_URL}${kind}/?page=${page}&format=json`);

        return resultsData;
    }

    getValueOf = async (url: string, value: string) => {
        if (this.cache[value]) {
            return this.cache[value];
        }

        const res = await this.http(url + "?format=json");
        const response = res[value];
        this.cache[value] = response;
        return response;
    }

    getValueOfAll = async (urls: string[], value: string) => {
        if (this.cache[value]) {
            return this.cache[value];
        }

        const values: string[] = [];

        for(const url of urls) {
            const res = await this.http(url + "?format=json");
            values.push(res[value]);
        }

        const response = values.length > 0 ? values.join(", ") : "None";
        this.cache[value] = response;

        return response;
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
                const resultTransformed: any = {};
                forEachObject(result, async (key, value) => {

                    switch (key) {
                    case "species":
                        value = await this.getValueOf(value, "name");
                        break;
                    case "homeworld":
                        value = await this.getValueOf(value, "name");
                        break;
                    case "films":
                        value = await this.getValueOfAll(value, "title");
                        break;
                    case "vehicles":
                        value = await this.getValueOfAll(value, "name");
                        break;
                    case "starships":
                        value = await this.getValueOfAll(value, "name");
                        break;
                    case "pilots":
                        value = await this.getValueOfAll(value, "name");
                        break;
                    case "crew":
                        value = value.replace(",", "");
                        break;
                    case "mass":
                        value = value.replace(",", "");
                        break;
                    }

                    resultTransformed[key] = value;
                });

                list.push({ id: resultIndex, data: resultTransformed });
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
