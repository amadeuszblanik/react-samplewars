import React, {useEffect, useState} from "react";
import { Loading } from "../src/components";
import { SwApi } from "../src/dao";
import { hoursDiff } from "../src/utils";
import Welcome from "../src/modules/Welcome";

const Home: React.FunctionComponent = () => {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const getApiDataFromLocalstorage = () => {
    const timeOfCachedData = Number(localStorage.getItem("apiDataSavedTimestamp"));
    const cachedData = localStorage.getItem("apiDataSaved");
    const currentDate = new Date();
    const validCacheDate = !isNaN(timeOfCachedData) ? hoursDiff(timeOfCachedData, currentDate) <= 8 : false;

    if (!validCacheDate || !cachedData) {
      return false;
    }

    setFetching(false);
    return true;
  }

  useEffect(() => {
    if (getApiDataFromLocalstorage()) {
      return;
    }

    const fetchApi = async () => {
      try {
        const { resultList: apiData } = await new SwApi().getResults();
        localStorage.setItem("apiDataSaved", JSON.stringify(apiData));
        localStorage.setItem("apiDataSavedTimestamp", String(new Date().getTime()));
        setFetching(false);
      } catch (err) {
        console.error("An error has occured", { err });
        setError("Can't connect to SWAPI. Please try again later");
      }
    }

    fetchApi();
  });

  if (error) {
    return <Loading content={error} />;
  }

  return <Welcome canPlay={!fetching} />;
}

export default Home;
